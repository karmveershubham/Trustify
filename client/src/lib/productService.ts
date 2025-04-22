// Product service for data fetching

export interface Product {
  id: string;
  name: string;
  description: string;
  listed_date: string;
  category: string;
  price: any; // Neo4j integer or regular number
  images: string[];
  seller: string;
  verifiedBy: string;
}

// Function to get a product by ID
export async function getProductById(id: string): Promise<Product> {
  try {
    // Replace with actual API call or database query
    return {
      id,
      name: id.includes("bike") ? "Mountain Bike" : `Product ${id}`,
      description:
        "Durable mountain bike suitable for rough terrains. Features premium suspension, lightweight frame, and reliable braking system for the ultimate off-road experience.",
      listed_date: new Date().toISOString().split("T")[0],
      category: "SPORTS",
      price: 499.99,
      images: [
        "https://res.cloudinary.com/dvfz67hyi/image/upload/v1739694460/products/qwd4krhn3fprxyzzza9k.jpg",
        "https://res.cloudinary.com/dvfz67hyi/image/upload/v1742217874/products/xqeyjvcbammhbb1nckkl.jpg",
        "https://res.cloudinary.com/dvfz67hyi/image/upload/v1739694460/products/qwd4krhn3fprxyzzza9k.jpg",
      ],
      seller: "Pratiksha Dixit",
      verifiedBy: "QualityCheck AI",
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// Function to get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    return Array.from({ length: 6 }, (_, i) => ({
      id: `product-${i + 1}`,
      name: i % 2 === 0 ? "Mountain Bike" : `Sports Equipment ${i + 1}`,
      description: "Durable mountain bike suitable for rough terrains.",
      listed_date: new Date().toISOString().split("T")[0],
      category: "SPORTS",
      price: 499.99 + i * 50,
      images: [
        "https://res.cloudinary.com/dvfz67hyi/image/upload/v1739694460/products/qwd4krhn3fprxyzzza9k.jpg",
      ],
      seller: "Pratiksha Dixit",
      verifiedBy: "QualityCheck AI",
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
