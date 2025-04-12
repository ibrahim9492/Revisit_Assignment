import Link from "next/link";

const ProductCard = ({ title, price, reviews, brand, image, slug }) => {
  return (
    <Link href={`/product/${slug}`} passHref>
      <div className="bg-white rounded-lg border border-gray-200 p-3 relative cursor-pointer">
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">New</div>
        
        {/* Product Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded mb-3"
        />

        <p className="text-xs text-gray-400">{brand}</p>
        <h2 className="font-semibold text-sm">{title}</h2>
        <p className="text-sm text-red-500">★★★★★ <span className="text-gray-500">({reviews} Reviews)</span></p>
        <p className="font-bold text-md">${price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
