"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    listed_date: string;
    category: string;
    price: any; // Neo4j integer or regular number
    images: string[];
    seller: string; // Seller information
    verifiedBy: string; // Verification info
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();
  let priceValue: number;

  // Handle Neo4j integer or regular number
  if (typeof product.price === "object" && typeof product.price.toNumber === "function") {
    priceValue = product.price.toNumber();
  } else if (typeof product.price === "number") {
    priceValue = product.price;
  } else {
    priceValue = 0; // fallback to prevent crash
  }

  // Extract category or default
  const category = product.category || "SPORTS";
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"]; // Fallback image
  const listedDate = new Date(product.listed_date).toLocaleDateString();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering
    setIsFavorite(!isFavorite);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${product.id}`);  // This navigates to the product details page
  };
  

  const handleVerifyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add verification logic here
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[280px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={product.name}
            width={280}
            height={210}
            className="w-full h-full object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
          />
          {images.length > 1 && (
            <>
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
        <button
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF3366" stroke="#FF3366" strokeWidth="2" className="w-4 h-4">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start mb-1.5">
          <div>
            <h2 className="text-base font-semibold line-clamp-1">{product.name}</h2>
            <p className="text-xs text-gray-500">{category}</p>
          </div>
          <h4 className="text-xs text-gray-500">{listedDate}</h4>
        </div>

        <div className="text-lg font-bold text-blue-600 mb-1.5">${priceValue.toLocaleString()}</div>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{product.description}</p>

        <div className="flex gap-2">
          <button 
            className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex-1 hover:bg-blue-700 transition-colors"
            onClick={handleBuyClick}
          >
            Contact Seller
          </button>
          {!product.verifiedBy && (
            <button 
              className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg font-medium flex-1 hover:bg-gray-200 transition-colors"
              onClick={handleVerifyClick}
            >
              Verify
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            {product.verifiedBy ? (
              <div className="flex items-center gap-1 text-blue-600 text-xs">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0l2.39 6.91H19l-5.28 3.83L14.77 17 10 13.8 5.23 17l.55-6.26L1 6.91h6.61z" />
                </svg>
                <span>Verified by {product.verifiedBy}</span>
              </div>
            ) : (
              <div className="text-blue-600 text-xs">
                Seller: {product.seller || "Unknown"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
