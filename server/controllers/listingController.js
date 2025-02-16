import * as driver from '../neo4j/neo4j.js';

// Function to get all products
export const getProducts = async (req, res) => {
  const session = driver.getDriver().session();

  try {
    const query = `
      MATCH (p:Product)
      RETURN p
      ORDER BY p.createdAt DESC
    `;

    const result = await session.run(query);

    const products = result.records.map((record) => {
      const product = record.get('p').properties;
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        purchasedDate: product.purchasedDate,
        category: product.category,
        price: product.price,
        image: product.image || null,
        createdAt: product.createdAt,
      };
    });

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(400).json({ error: 'All fields are required' });
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

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
