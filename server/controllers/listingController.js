import * as driver from "../neo4j/neo4j.js";

// Function to get all products
export const getProducts = async (req, res) => {
  const session = driver.getDriver().session();

  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ status: "failed", message: "User authentication required" });
    }

    const query = `
      MATCH (me:User {id: $userId})-[:HAS_CONTACT]-(mutualFriend:User)
      MATCH (mutualFriend)-[:HAS_CONTACT]->(me)
      MATCH (mutualFriend)-[:LISTED]->(product:Product)
      WHERE NOT (me)-[:LISTED]->(product)
      RETURN DISTINCT product
      ORDER BY product.listed_date DESC
    `;

    const result = await session.run(query, { userId });

    const products = result.records.map((record) => {
      const product = record.get("product");
      if (!product) return null; // Handle missing product node

      return {
        id: product.properties.id,
        name: product.properties.name,
        description: product.properties.description,
        category: product.properties.category,
        price: product.properties.price,
        images: product.properties.images || [], // Ensure images exist
        condition: product.properties.condition || "Unknown",
        listed_date: product.properties.listed_date,
      };
    }).filter(Boolean); // Remove null values

    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ status: "failed", message: "Internal server error" });
  } finally {
    await session.close();

    
  }
};

// Function to add a new product


export const addProduct = async (req, res) => {
  const session = driver.getDriver().session();

  try {
    console.log("Received body:", req.body);

    const { userId, name, description, price, category, condition } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Extract uploaded image URL from multer
    const images = imageUrl ? [imageUrl] : [];

    if (!userId || !name || !description || !price || !category || !condition || images.length === 0) {
      return res.status(400).json({ status: "failed", message: "All fields, including images, are required" });
    }

    console.log("userId:", userId);
    console.log("name:", name);
    console.log("description:", description);
    console.log("price:", price);
    console.log("category:", category);
    console.log("condition:", condition);
    console.log("images:", images);

    const query = `
      MATCH (u:User {id: $userId})  
      CREATE (p:Product {  
        id: apoc.create.uuid(),  
        name: $name,  
        price: toFloat($price),  
        description: $description,  
        category: $category,  
        images: $images,  
        condition: $condition,  
        listed_date: datetime().epochMillis  
      })  
      CREATE (u)-[:LISTED]->(p)  
      RETURN p;
    `;

    const result = await session.run(query, { 
      userId, 
      name, 
      description, 
      price, 
      category, 
      condition, 
      images // Now correctly passing the images array
    });

    console.log("Query result:", result);

    if (result.records.length === 0) {
      return res.status(500).json({ status: "failed", message: "Failed to add product" });
    }

    const createdProduct = result.records[0].get("p").properties;

    res.status(201).json({
      status: "success",
      message: "Product added successfully",
      product: createdProduct,
    });

  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ status: "failed", message: "Unable to add product" });
  } finally {
    await session.close();
  }
};