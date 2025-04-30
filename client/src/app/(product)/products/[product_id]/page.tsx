"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, Product } from "@/lib/productService";
import { toast } from "sonner";




export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.product_id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productDetails, setProductDetails] = useState<Record<string, any> | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerifyProduct=  async (productId: string)=>{

    try {
      setVerifying(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/products/${productId}/verify`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      if(data.success){
        console.log('Product verified successfully:', data);
        toast.success('Product verified successfully!');
      }else{
        toast.message('Product already verified!');
      }
      
    } catch (error) {
      console.error('Error verifying product:', error);
      toast.error('Error verifying product. Please try again.');
    }finally{
      setVerifying(false);
    }
    
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await getProductById(productId);
        setProduct(productData);
        
        // Parse the details JSON string if it exists
        if (productData.details && typeof productData.details === 'string') {
          try {
            const parsedDetails = JSON.parse(productData.details);
            setProductDetails(parsedDetails);
          } catch (e) {
            console.error("Error parsing product details:", e);
          }
        }
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
          <p className="mt-2 text-gray-600">The product you are looking for does not exist or has been removed.</p>
          <Link href="/products" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const priceValue = product.price;
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];
  // const isProductVerified = product.verifiedBy && product.verifiedBy !== "Unknown" && product.verifiedBy !== "Null";

  // Format a detail value based on its key
  const formatDetailValue = (key: string, value: any): string => {
    if (key === "kmDriven" && !isNaN(Number(value))) {
      return `${Number(value).toLocaleString()} km`;
    }
    return String(value);
  };

  return (
    <div className="container mx-auto p-4 mt-20 ">
      {/* Back button */}
      <Link 
        href="/products"
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="md:flex flex-col">
        {/* Product title and price - now at the top */}
        <div className="flex justify-between items-center mb-10">
          <span className="text-sm font-medium text-gray-500 uppercase">{product?.category}</span>
          <h1 className="text-4xl text-blue-900 font-bold">{product?.name}</h1>
          <div className="text-3xl font-bold text-blue-700">₹{priceValue.toLocaleString()}</div>
        </div>
        
        <div className="md:flex">
          {/* Left side - Image gallery */}
          <div className="md:w-1/2">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src={images[activeImageIndex]}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-contain rounded-lg bg-gray-50"
              />
              <button
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FF3366" stroke="#FF3366" strokeWidth="2" className="w-5 h-5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Thumbnail gallery */}
            {images.length > 1 && (
              <div className="flex overflow-x-auto p-2 gap-2 mt-4 max-w-md mx-auto">
                {images.map((image: string, index: number) => (
                  <div 
                    key={index}
                    className={`flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden aspect-square w-16 ${
                      activeImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain bg-gray-50"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description - now below the image */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 text-gray-700">{product.description}</p>
            </div>
          </div>
          
          {/* Right side - Product details */}
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Listed on: {new Date(product.listed_date).toLocaleDateString()}</p>
            </div>
            
            {/* Vehicle Details Section - now mapping through all available details */}
            {productDetails && Object.keys(productDetails).length > 0 && (
              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">
                  {product.category === "vehicles" || product.category === "cars" 
                    ? "Vehicle Details" 
                    : "Product Details"}
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(productDetails).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-600 text-sm">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span>
                      <p className="font-medium">{formatDetailValue(key, value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            { product.verifiedBy !== "self" && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                {!product.verifiedBy ? (
                  <button
                     onClick={() => handleVerifyProduct(product.id)}
                    disabled={verifying}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors text-center w-full ${
                      verifying
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {verifying ? "Verifying..." : "Verify Product"}
                  </button>
                ) : (
                  <button
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center w-full"
                  >
                    Already Verified
                  </button>
                )}

                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center w-full">
                  Contact Seller
                </button>
              </div>
            </div>
          )}
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-blue-600">Seller: {product.seller || 'Anonymous'}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.verifiedBy
                      ? `Verified By: ${product.verifiedBy}` 
                      : 'Not verified yet'}
                  </p>
                </div>
                <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  Message Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}