"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <Image
          src={images[0]}
          alt={product.name}
          width={300}
          height={180}
          className="w-full h-40 object-cover"
        />
        <button
          className="absolute top-2 right-2 bg-white rounded-full p-1.5"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF3366" stroke="#FF3366" strokeWidth="2" className="w-5 h-5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <h4 className="text-sm text-gray-500">{listedDate}</h4>
        </div>

        <div className="text-xl font-bold mt-0.5">${priceValue.toLocaleString()}</div>
        <p className="text-gray-700 text-sm mt-0.5 line-clamp-2">{product.description}</p>

        <div className="flex mt-3 gap-2">
          <button 
            className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded font-medium flex-1 hover:bg-blue-700 transition-colors"
            onClick={handleBuyClick}
          >
            Buy Now
          </button>
          <button 
            className="bg-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded font-medium hover:bg-gray-300 transition-colors"
            onClick={handleVerifyClick}
          >
            Verify Product
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
          <div className="text-xs">
          <div className="flex items-center gap-1 font-semibold text-blue-600 text-[11px]">
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 0l2.39 6.91H19l-5.28 3.83L14.77 17 10 13.8 5.23 17l.55-6.26L1 6.91h6.61z" />
  </svg>
  <div className="text-xs">
  {product.verifiedBy ? (
    <div className="font-medium text-[11px] text-blue-600">
      Verified By – {product.verifiedBy}
    </div>
  ) : (
    <div className="text-gray-600 text-[10px] mt-0.5">
      Seller – {product.seller || "Unknown"}
    </div>
  )}
</div>


</div>

          
          </div>
          <button 
            className="bg-white border border-gray-300 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleVerifyClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
