import { getDriver } from '../neo4j/neo4j.js';
import pQuery from '../models/productQuery.js';
import { generalAttributes, categoryAttributes } from '../models/productAttribute.js';
import cloudinary from '../config/cloudinary.js';



export function prepareProductData(req, category) {
    const queryParams = {};
    const details = {};

    generalAttributes.forEach(field => {
        if (req.body[field] !== undefined) {
            queryParams[field] = req.body[field];
        }
    });

    categoryAttributes[category].forEach(field => {
        if (req.body[field] !== undefined) {
            details[field] = req.body[field];
        }
    });

    queryParams.details = JSON.stringify(details);
    queryParams.userId = req.body.userId;
    queryParams.label = category;

    return queryParams;
}

export function validateProductData(req, category) {
    const missingFields = [];

    generalAttributes.forEach(field => {
        if (req.body[field] === undefined) {
            missingFields.push(field);
        }
    });

    categoryAttributes[category].forEach(field => {
        if (req.body[field] === undefined) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        return { isValid: false, missingFields };
    }

    return { isValid: true };
}


export const addProduct = async (req, res) => {
  let session;
  try {
      const { subCategory } = req.body;

      // Check for valid category
      if (!categoryAttributes[subCategory]) {
          return res.status(400).json({ error: "Invalid category" });
      }

      // Validate product data
      const validation = validateProductData(req, subCategory);
      if (!validation.isValid) {
          return res.status(400).json({
              error: `Missing required fields: ${validation.missingFields.join(', ')}`
          });
      }

      // Upload image to Cloudinary
      let imageUrl;
      if (req.body.image) {
          const uploadedImage = await cloudinary.uploader.upload(req.body.image, {
              folder: 'product_images',  // You can organize images in folders
          });
          imageUrl = uploadedImage.secure_url;  // URL to the uploaded image
      } else {
          return res.status(400).json({ error: "Image is required" });
      }

      // Prepare product data for Neo4j
      const queryParams = prepareProductData(req, subCategory, imageUrl);
      console.log('Query Parameters:', queryParams);  // Log the query parameters

      // Run the query to add product to Neo4j
      session = getDriver().session();
      const query = pQuery;
      const result = await session.run(query, queryParams);

      // Log the result to see what Neo4j is returning
      console.log('Query Result:', result);

      // Check if the result contains records
      if (result.records.length === 0) {
          return res.status(500).json({ error: 'Failed to add product, no data returned' });
      }

      const productNode = result.records[0].get('p');

      // If the product node is missing, return an error
      if (!productNode) {
          return res.status(500).json({ error: 'Product creation failed, no product node returned' });
      }

      const product = productNode.properties;
      res.status(201).json({ success: true, product });
  } catch (error) {
      console.error('Error while adding product: ', error);
      res.status(500).json({ error: 'Internal server error, please try again' });
  } finally {
      if (session) {
          await session.close();
      }
  }
};
export const getProduct = async (req, res) => {
  console.log("Request received");

  // Get the logged-in user's userId from the request (authenticated user)
  const userId = req.user?.id; // Assuming `userId` is added to the `req.user` after authentication

  // Check if the user is authenticated
  if (!userId) {
    return res.status(400).json({ status: "failed", message: "User authentication required" });
  }

  let session;
  try {
    session = getDriver().session();
    
    // Cypher query to fetch the products from friends and friends of friends
    const query = `
      MATCH (u:User {id: $userId})
      MATCH (u)-[:HAS_CONTACT]->(contacts)
      MATCH (contacts)-[:HAS_CONTACT]->(u)
      OPTIONAL MATCH (contacts)-[:LISTED]->(p1:Product)
      OPTIONAL MATCH (contacts)-[:HAS_VERIFIED]->(p2:Product)
      WITH contacts, 
           contacts.name AS ContactName, 
           contacts.mobileNo AS ContactMobile, 
           COLLECT(DISTINCT p1) AS Products1, 
           COLLECT(DISTINCT p2) AS Products2
      RETURN ContactName, 
             ContactMobile, 
             apoc.coll.union(coalesce(Products1, []), coalesce(Products2, [])) AS Products;
    `;
    
    // Execute the query with the userId extracted from the authenticated user
    const result = await session.run(query, { userId });

    // Process the query result and format the response
    const data = result.records.map(record => ({
      contactName: record.get("ContactName"),
      contactMobile: record.get("ContactMobile"),
      products: record.get("Products").map(product => ({
        id: product.identity.low, // Assuming identity has a low value as the product ID
        name: product.properties.title, 
        description: product.properties.description,
        listed_date: `${product.properties.listingDate.year.low}-${product.properties.listingDate.month.low}-${product.properties.listingDate.day.low}`,
        category: product.properties.subCategory,
        price: parseInt(product.properties.price), // Converting price to integer
        images: product.properties.image || [], // Assuming it's an array of image URLs
      }))
    }));

    // Ensure the response is only sent once
    if (data.length > 0) {
      res.status(200).json({ success: true, products: data.flat() }); // Flatten if you need a single array of products
    } else {
      res.status(404).json({ success: false, message: "No products found" });
    }

  } catch (error) {
    console.error('Error retrieving products:', error);
    // Ensure response is sent only once in case of error
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } finally {
    if (session) {
      await session.close();
    }
  }
};
