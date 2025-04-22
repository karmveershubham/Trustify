import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    listed_date: string;
    category: string;
    price: any; // <- allow any for now since Neo4j might return an object
    images: Array<string>;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  let priceValue: number;

  // Handle Neo4j integer or regular number
  if (typeof product.price === "object" && typeof product.price.toNumber === "function") {
    priceValue = product.price.toNumber();
  } else if (typeof product.price === "number") {
    priceValue = product.price;
  } else {
    priceValue = 0; // fallback to prevent crash
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <h4 className="text-sm font-semibold">{String(product.listed_date)}</h4>
        <p className="text-gray-600 text-sm truncate">{product.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-green-600 font-bold">${priceValue.toFixed(2)}</span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}