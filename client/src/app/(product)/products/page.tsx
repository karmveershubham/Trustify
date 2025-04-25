'use client'

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  listed_date: string;
  category: string;
  price: number;
  images: Array<string>;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = Cookies.get("is_auth");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/products`, {
          method: "GET",
          credentials: "include", // ✅ needed to send cookies
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        console.log("Response status:", response.status);
  
        // Check if response status is not OK
        if (!response.ok) {
          console.error(`Failed to fetch products. Status code: ${response.status}`);
          throw new Error("Failed to fetch products");
        }
  
        const data: { products: Product[] } = await response.json();
        console.log("Fetched data:", data);
  
        // Ensure 'products' is an array
        if (Array.isArray(data.products)) {
          const productList = data.products.map((item) => item.products).flat(); // Flattening the nested products
          setProducts(productList);
          setFilteredProducts(productList);
  
          // Extract unique categories
          const uniqueCategories: string[] = ["All", ...Array.from(new Set(productList.map((p) => p.category)))];
          setCategories(uniqueCategories);
        } else {
          throw new Error("Products data is not an array");
        }
      } catch (error) {
        toast.error("Failed to fetch products.");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  // Filtering function
  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(category === "All" ? products : products.filter((p) => p.category === category));
  };

  // Sorting function
  const sortedProducts = Array.isArray(filteredProducts)
    ? [...filteredProducts].sort((a, b) => {
        if (sortOption === "priceLow") return a.price - b.price;
        if (sortOption === "priceHigh") return b.price - a.price;
        if (sortOption === "dateNew") return new Date(b.listed_date).getTime() - new Date(a.listed_date).getTime();
        if (sortOption === "dateOld") return new Date(a.listed_date).getTime() - new Date(b.listed_date).getTime();
        return 0;
      })
    : [];

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold text-center mt-24 mb-6">Products</h1>

      <div className="container mx-auto flex flex-row">
        {/* Sidebar */}
        <div className="w-1/4 p-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Category</h3>
              <ul>
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => handleFilter(category)}
                    className={`cursor-pointer p-2 rounded-md transition-all ${
                      selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-300"
                    }`}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sorting Options */}
            <div>
              <h3 className="text-lg font-medium mb-2">Sort By</h3>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="dateNew">Newest First</option>
                <option value="dateOld">Oldest First</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4 p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
          >
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
