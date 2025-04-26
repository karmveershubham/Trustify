"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, Product } from "@/lib/productService"; // ✅ Import Product type

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.product_id as string; // Ensure params exist

  const [product, setProduct] = useState<Product | null>(null); // ✅ typed properly
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center mt-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center mt-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/products" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const priceValue = product.price; // ✅ Already parsed as number in service

  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
  <div className="mb-6">
    <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to Products
    </Link>
  </div>

  <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-8 p-6">
    {/* Left - Images */}
    <div className="md:w-1/2 flex flex-col gap-4">
      <div className="relative rounded-lg overflow-hidden shadow-md">
        <Image
          src={images[activeImageIndex]}
          alt={product.name}
          width={800}
          height={600}
          className="w-full h-[400px] object-cover transition-all duration-300 hover:scale-105"
        />
        <button
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF3366" stroke="#FF3366" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className={`w-20 h-16 rounded-md overflow-hidden cursor-pointer border-2 ${
                activeImageIndex === index ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={60}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Right - Details */}
    <div className="md:w-1/2 flex flex-col justify-between gap-6">
      <div>
        <span className="text-sm uppercase text-gray-400">{product.category}</span>
        <h1 className="text-3xl font-bold mt-1 text-gray-800">{product.name}</h1>
        <p className="text-xs text-gray-500 mt-1">
          Listed on: {new Date(product.listed_date).toLocaleDateString()}
        </p>

        <div className="text-4xl font-extrabold text-blue-700 mt-4">
          ${priceValue.toLocaleString()}
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Description</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            Buy Now
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition">
            Verify Product
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center mt-2">
          {product.verifiedBy ? (
            <span className="text-blue-600">Verified By – {product.verifiedBy}</span>
          ) : (
            <span>Seller – {product.seller || "Unknown"}</span>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
