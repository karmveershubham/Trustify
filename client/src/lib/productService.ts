// Define the Product type
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

// Function to get a product by ID (with an actual API call)
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}`); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error("Product not found");
    }

    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      listed_date: data.listed_date,
      category: data.category,
      price: data.price,
      images: data.images,
      seller: data.seller,
      verifiedBy: data.verifiedBy,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

// Function to get all products (with an actual API call)
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch("http://localhost:8080/api/listings/products"); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return data.products.map((product: any) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      listed_date: product.listed_date,
      category: product.category,
      price: product.price,
      images: product.images,
      seller: product.seller,
      verifiedBy: product.verifiedBy,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
