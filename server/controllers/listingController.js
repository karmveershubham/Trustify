import { getDriver } from '../neo4j/neo4j.js';
import pQuery from '../models/productQuery.js';
import { generalAttributes, categoryAttributes } from '../models/productAttribute.js';
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
      console.log("userId", req.user?.id);
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
      queryParams.userId = req.user?.id; // Assuming userId is available after authentication
    
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
      const userID=req.user?.id; // Assuming userId is available after authentication
      await createAndDispatchNotifications({
        senderId: userID,
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

  const userId = req.user?.id; // Assuming userId is available after authentication

  if (!userId) {
    return res.status(400).json({ status: "failed", message: "User authentication required" });
  }

  let session;
  try {
    session = getDriver().session();

    const query = `
      MATCH (u:User {id: $userId})
      MATCH (u)-[:HAS_CONTACT]->(contact:User)-[:HAS_CONTACT]->(u)

      OPTIONAL MATCH (contact)-[r1:LISTED]->(p1:Product)  WHERE r1.isSold = false
      OPTIONAL MATCH (contact)-[:HAS_VERIFIED]->(p2:Product)<-[r2:LISTED]-() WHERE r2.isSold = false

      WITH 
        COLLECT(DISTINCT { product: p1, seller: contact.name, verifiedBy: NULL }) + 
        COLLECT(DISTINCT { product: p2, seller: p2.sellerName, verifiedBy: contact.name }) AS Products

      UNWIND Products AS p
      RETURN p.product AS product, p.verifiedBy AS verifiedBy, p.seller AS seller
    `;

    const result = await session.run(query, { userId });

    const products = [];

    result.records.forEach(record => {
      const productNode = record.get("product");
      const verifiedBy = record.get("verifiedBy");
      const seller = record.get("seller");

      if (productNode) {
        products.push({
          id: productNode.properties.id,   // ✅ Correct! (use the real id you saved)
          name: productNode.properties.title,
          description: productNode.properties.description,
          listed_date: `${productNode.properties.listingDate.year.low}-${productNode.properties.listingDate.month.low}-${productNode.properties.listingDate.day.low}`,
          category: productNode.properties.subCategory,
          price: parseInt(productNode.properties.price),
          images: productNode.properties.image || [],
          verifiedBy: verifiedBy || null,
          seller: seller || "Unknown"
        });
        
      }
    });

    if (products.length > 0) {
      res.status(200).json({ success: true, products });
    } else {
      res.status(404).json({ success: false, message: "No products found" });
    }

  } catch (error) {
    console.error('Error retrieving products:', error);
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
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: No user ID found' });
  }

  let session;
  try {
    session = getDriver().session();

    const query = `
      MATCH (requestingUser:User {id: $userId})
      MATCH (p:Product {id: $productId})

      OPTIONAL MATCH (requestingUser)-[:LISTED]->(p)

      MATCH (requestingUser)-[:HAS_CONTACT]->(mutual:User)-[:HAS_CONTACT]->(requestingUser)

      OPTIONAL MATCH (mutual)-[:HAS_VERIFIED]->(p)
      
      OPTIONAL MATCH (seller:User)-[:LISTED]->(p)

      WITH p, mutual, seller, requestingUser
      WHERE mutual IS NOT NULL OR requestingUser = seller 

      OPTIONAL MATCH (verifier:User)-[:HAS_VERIFIED]->(p)
      WHERE verifier = mutual OR verifier = requestingUser OR requestingUser = seller 

      RETURN p AS product, 
             seller.name AS sellerName, 
             verifier.name AS verifierName
    `;

    const result = await session.run(query, { productId: id, userId });

    if (result.records.length === 0) {
      return res.status(403).json({ error: 'Forbidden: You are not authorized to view this product' });
    }

    const record = result.records[0];
    const productNode = record.get('product');
    const sellerName = record.get('sellerName');
    const verifierName = record.get('verifierName');

    if (!productNode) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productNode.properties;

    const year = product.listingDate?.year?.low || 0;
    const month = product.listingDate?.month?.low || 0;
    const day = product.listingDate?.day?.low || 0;
    const listed_date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const images = product.image && Array.isArray(product.image) ? product.image : [];

    res.status(200).json({ 
      success: true, 
      product: {
        id: product.id,
        name: product.title || 'Unknown',
        description: product.description || 'No description available',
        listed_date,
        category: product.subCategory || 'No category',
        price: parseInt(product.price) || 0,
        images: images,
        details: product.details || {},
        seller: sellerName || "Unknown",
        verifiedBy: verifierName || "Unknown"
      }
    });

  } catch (error) {
    console.error('Error retrieving product by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (session) {
      await session.close();
    }
  }
};


export const verifyProduct = async (req, res) => {
  const session = getDriver().session();
  const userId = req.user.id;
  const productId = req.params.productId;

  console.log("Attempting to verify product...");
  console.log("User ID:", userId);
  console.log("Product ID:", productId);

  try {
    const result = await session.run(
      `MATCH (u:User {id: $userId})
       MATCH (p:Product {id: $productId})<-[:LISTED]-(seller:User)
       MATCH (u)-[:HAS_CONTACT]->(seller)
       OPTIONAL MATCH (u)-[v:HAS_VERIFIED]->(p)
       WITH u, p, v
       CALL apoc.do.when(
         v IS NULL,
         'MERGE (u)-[:HAS_VERIFIED]->(p) RETURN true AS created',
         'RETURN false AS created',
         {u: u, p: p}
       ) YIELD value
       RETURN value.created AS created, p.id AS productId`,
      { userId, productId }
    );

    if (result.records.length === 0) {
      console.log("Verification failed — user is not a contact of the seller.");
      return res.status(403).json({ error: 'You are not authorized to verify this product.' });
    }

    const created = result.records[0].get('created');

    if (created) {
      console.log("Product verified successfully!");
    } else {
      console.log("Product was already verified. No new relation created.");
    }

    res.json({ success: true, productId, newlyVerified: created });
  } catch (error) {
    console.error('Error verifying product:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
};
