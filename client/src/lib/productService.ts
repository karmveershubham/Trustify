// Define the Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  listed_date: string;
  category: string;
  price: number; // Changed to number for easier handling
  images: string[];
  seller: string;
  verifiedBy?: string | null; // Assuming verifiedBy can be null
  details?: string | null; 
}

// Helper function to parse Neo4j integer safely
const parsePrice = (price: any): number => {
  return price && typeof price.toNumber === "function" ? price.toNumber() : price;
};

// Helper function to handle Date (fallback to current date if invalid)
const formatDate = (listingDate: any): string => {
  if (!listingDate || !listingDate.year || !listingDate.month || !listingDate.day) {
    // Fallback to current date if listingDate is missing
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  }

  const year = listingDate.year.low || 0;
  const month = listingDate.month.low || 0;
  const day = listingDate.day.low || 0;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

// Corrected function to get a product by ID
// Corrected function to get a product by ID
// Corrected function to get a product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/products/${id}`, {
      method: "GET",
      credentials: "include",
    });
    
    console.log("API Response:", response); // Log the response to see the status and body
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log("Product not found (404)");
      }
      throw new Error(`Product not found (status: ${response.status})`);
    }
    
    const data = await response.json();
    console.log("Product Data:", data); // Check what data is returned
    
   
    const product = data.product;

    if (!product) {
      throw new Error("Product data is missing");
    }

    // Handle Image (Ensure it's an array even if the backend sends an empty value)
    const images = Array.isArray(product.images) ? product.images : [];
    console.log("Images:", images);  // Check if images array is populated

    // Safely handle listingDate (compose "YYYY-MM-DD")
    const listed_date = formatDate(product.listingDate);

    // Handle seller and verifiedBy similarly as in `getAllProducts`
    const seller = product.seller || "Unknown";  // Ensure a fallback for seller
    const verifiedBy = product.verifiedBy || "Unknown";  // Ensure a fallback for verifiedBy

    return {
      id: product.id,
      name: product.name?.trim() || "", // Fallback if title is missing
      description: product.description || "",
      listed_date,
      category: product.category || "", // Assuming backend sends `subCategory`
      price: parsePrice(product.price),
      images: images,  // Ensure images are an array, even if empty
      seller: product.seller,         // Handle seller field with fallback
      verifiedBy: product.verifiedBy,   // Handle verifiedBy field with fallback
      details: product.details || "", // Ensure details are present
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Function to get all products (with an actual API call)
export async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/products`); // Replace with your actual API endpoint
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
