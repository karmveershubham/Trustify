import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    purchasedDate:string;
    category:string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <h4 className="text-sm font-semibold">{product.purchasedDate}</h4>
        <p className="text-gray-600 text-sm truncate">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
