// // app/my-listings/page.tsx (or pages/my-listings.tsx if you're using /pages)
// 'use client'; // only if you're using app directory and you want interactive features

// import React, { useEffect, useState } from 'react';

// interface Product {
//   id: string;
//   title: string;
//   description: string;
//   price: string;
//   subCategory: string;
//   image: string[];
//   details: string;
//   listingDate: {
//     year: { low: number; high: number };
//     month: { low: number; high: number };
//     day: { low: number; high: number };
//   };
// }

// export default function MyListingsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/my-listings`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
            
  //         },
  //         credentials: 'include',

  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch listings');
  //       }

  //       const data = await response.json();

  //       if (data.success) {
  //         setProducts(data);
  //       } else {
  //         throw new Error(data.message || 'Failed to fetch listings');
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch listings', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListings();
  // }, []);

//   if (loading) return <div>Loading...</div>;


//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">My Listings</h1>
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <div className="container mx-auto px-4 py-8">
//   //       <h1 className="text-3xl font-bold mb-8">My Listings</h1>
//   //       <div className="bg-red-100 p-4 rounded-lg">
//   //         <p className="text-red-800">{error}</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }

//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">My Listings</h1>
  
//         {products.length === 0 ? (
//           <div className="bg-blue-100 p-4 rounded-lg">
//             <p className="text-blue-800">You haven't listed any products yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <img
//                   src={product.image[0]}
//                   alt={product.title}
//                   className="h-48 w-full object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
//                   <p className="text-gray-600 mb-2">{product.description}</p>
//                   <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
//                   <p className="text-sm text-gray-500">{product.subCategory}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
// }


'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  description: string;
  price: any;
  subCategory: string;
  image: string[];
  details: string;
  listingDate: {
    year: { low: number; high: number };
    month: { low: number; high: number };
    day: { low: number; high: number };
  };
}

export default function MyListingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/my-listings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            
          },
          credentials: 'include',

        });

        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
          console.log(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch listings');
        }
      } catch (error) {
        console.error('Failed to fetch listings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Listings</h1>
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Listings</h1>

      {products.length === 0 ? (
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-blue-800">You have not listed any products yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{products.map((product) => (
  <Link 
    key={product.id} 
    href={`/products/${product.id}`} 
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div>
      <div className="relative h-48 w-full">
        <Image
          src={product.image[0] || '/fallback.jpg'} // fallback if image[0] is missing
          alt={product.title}
          fill
          className="object-cover"
          unoptimized // remove this if image domain is configured in next.config.js
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
        <p className="text-sm text-gray-500">{product.subCategory}</p>
      </div>
    </div>
  </Link>
))}

        </div>
      )}
    </div>
  );
}


