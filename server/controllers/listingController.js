import { getDriver } from '../neo4j/neo4j.js';
import pQuery from '../models/productQuery.js';
import { generalAttributes, categoryAttributes } from '../models/productAttribute.js';
import cloudinary from '../config/cloudinary.js';
import { createAndDispatchNotifications } from './notificationController.js';

export function validateProductData(req, category) {
    const missingFields = [];

    generalAttributes.forEach(field => {
        if (req.body[field] === undefined) {
            missingFields.push(field);
        }
    });

    const details = JSON.parse(req.body.details) || {};
    console.log("detasissssls", details);
    categoryAttributes[category].forEach(field => {
        if (details[field] === undefined) {
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
        
      console.log("reqbodyy", req.body);
      const { subCategory } = req.body;

      // Check for valid category
      if (!categoryAttributes[subCategory]) {
            console.error('Invalid category:', subCategory);
          return res.status(400).json({ error: "Invalid category" });
      }

      // Validate product data
      const validation = validateProductData(req, subCategory);
      if (!validation.isValid) {
            console.error('Validation failed:', validation.missingFields);
          return res.status(400).json({
              error: `Missing required fields: ${validation.missingFields.join(', ')}`
          });
      }

      // Upload image to Cloudinary

      const images = req.file && req.file.path ? [req.file.path] : [];
      if (images.length === 0) {
        return res.status(400).json({ status: "failed", message: "All fields, including images, are required" });
      }
      
    
      req.body.image=images;
      // console.log("reqqq bodyyyy", req.body);
      const queryParams = req.body;
    
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
      console.log('Product:', product); 

      await createAndDispatchNotifications({
        senderId: req.body.userId,
        productId: product.id,
        io: req.app.get('io'),
      });

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

export const getProductById = async (req, res) => {
    const { userId } = req.user?.id;
    const { productId } = req.params; // Assuming the product ID is passed as a URL parameter
    let session;
    try {
        session = getDriver().session();
        const query = `
            MATCH (p:Product {id: $userId})
            RETURN p
        `;
        const result = await session.run(query, { userId });
        if (result.records.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const product = result.records[0].get('p').properties;
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (session) {
            await session.close();
        }
    }
};