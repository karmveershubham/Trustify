"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";
interface Product {
  id: string;
  name: string;
  description: string;
  purchasedDate: string;
  category: string;
  price: number;
  image: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const auth = Cookies.get("is_auth");

  useEffect(() => {
    // if (auth===undefined) {
    //   router.push('/login');
    // }
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/listings/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: { products: Product[] } = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);

        // Extract unique categories
        const uniqueCategories: string[] = ["All", ...Array.from(new Set(data.products.map((p) => p.category)))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Filtering function
  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(category === "All" ? products : products.filter((p) => p.category === category));
  };

  // Sorting function
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "dateNew") return new Date(b.purchasedDate).getTime() - new Date(a.purchasedDate).getTime();
    if (sortOption === "dateOld") return new Date(a.purchasedDate).getTime() - new Date(b.purchasedDate).getTime();
    return 0;
  });


  if (loading) return <div className="text-center mt-10">Loading products...</div>;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-semibold text-center mt-20 mb-6">Products</h1>
      <div className="flex">
      <div className="w-1/4 p-6 ">
         {/* Sidebar */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" bg-white p-6 rounded-lg"
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

      <div className="container mx-auto p-6 flex gap-6">

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className=" w- 3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No products available</p>
          )}
        </motion.div>
      </div>
    </div>

    </div>
  );
}
