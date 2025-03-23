import * as driver from '../neo4j/neo4j.js';

// Function to get all products
export const getProducts = async (req, res) => {
  const session = driver.getDriver().session();

  try {
     const query = `
      MATCH (me:User {id: $userId})-[:HAS_CONTACT]->(mutualFriend:User)
      MATCH (mutualFriend)-[:HAS_CONTACT]->(me) 
      OPTIONAL MATCH (mutualFriend)-[:LISTED]->(listedProduct:Product)
      OPTIONAL MATCH (mutualFriend)-[:HAS_VERIFIED]->(verifiedProduct:Product)
      WITH COLLECT(DISTINCT listedProduct) + COLLECT(DISTINCT verifiedProduct) AS allProducts, me
      UNWIND allProducts AS product
      WITH DISTINCT product, me
      WHERE NOT (me)-[:LISTED]->(product)  
      RETURN DISTINCT product
      ORDER BY product.listed_date DESC
    `;

    const result = await session.run(query, {userId: req.body.id});

    const products = result.records.map((record) => {
      const product = record.get('product').properties;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        images: product.images || null,
        listed_date: product.listed_date,
      };
    });

    res.status(200).json({ status: "success",  products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ status: "failed", message: 'Internal server error' });
  } finally {
    await session.close();
  }
};

// Ensure addProduct is also exported
export const addProduct = async (req, res) => {
  try {
    const { name, description, purchasedDate, category, price } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!name || !description || !purchasedDate || !category || !price) {
      return res.status(400).json({ status: "failed", message: 'All fields are required' });
    }

    const session = driver.getDriver().session();

    const query = `
      CREATE (p:Product {
        id: apoc.create.uuid(),
        name: $name,
        description: $description,
        purchasedDate: $purchasedDate,
        category: $category,
        price: toFloat($price),
        image: $imageUrl,
        createdAt: datetime()
      })
      RETURN p
    `;

    const result = await session.run(query, {
      name,
      description,
      purchasedDate,
      category,
      price: parseFloat(price),
      imageUrl,
    });

    const product = result.records[0].get('p').properties;

    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({status: "failed", message: 'Internal server error' });
  }
};
