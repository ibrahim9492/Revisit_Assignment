import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/context/CartSlice";
import { motion } from "framer-motion";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const response = await fetch(`https://dummyjson.com/products/${slug}`);
  const product = await response.json();

  if (!product) return { notFound: true };

  return { props: { product } };
}

const ProductPage = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const images = product?.images || [];
  const selectedImage = images[currentIndex] || product?.thumbnail;

  const discountedPrice = (
    product.price - (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        price: parseFloat(discountedPrice),
        image: selectedImage,
        originalPrice: product.price,
        quantity,
      })
    );
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-6 text-white min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Image Section */}
      <motion.div
        className="flex flex-col gap-4 sm:flex-row"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2">
          {images.map((image, i) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={i}
              className={`bg-gray-300 w-16 h-16 rounded overflow-hidden cursor-pointer ring-2 ${
                currentIndex === i ? "ring-red-500" : "ring-transparent"
              }`}
              onClick={() => setCurrentIndex(i)}
            >
              <img
                src={image}
                alt={`Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback-image.jpg";
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Main Image */}
        <motion.div
          className="relative flex-1 bg-gray-300 rounded-xl aspect-square sm:h-96 overflow-hidden group"
          whileHover={{ scale: 1.01 }}
        >
          <span className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded-full">
            {product?.discountPercentage > 0 ? "Sale" : "New"}
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-100 z-10"
            onClick={goPrev}
          >
            ◀
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow hover:bg-gray-100 z-10"
            onClick={goNext}
          >
            ▶
          </motion.button>

          <div className="w-full h-full overflow-hidden">
            <motion.img
              src={selectedImage}
              alt={product?.title}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.jpg";
              }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Product Details */}
      <motion.div
        className="space-y-4"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="uppercase text-red-500 text-sm font-bold">{product?.category}</p>
          <h1 className="text-2xl text-[#1A1A1A] font-semibold">{product?.title}</h1>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>⭐</span>
            ))}
            <span>({product?.rating} rating)</span>
          </div>
        </div>

        <div>
          <p className="line-through text-gray-500 text-sm">${product.price.toFixed(2)}</p>
          <p className="text-2xl font-bold text-[#1A1A1A]">${discountedPrice}</p>
          <p className="text-sm text-gray-500 mt-1">{product?.description}</p>
          <p className="text-sm text-gray-400 mt-1">👁️ {product?.stock} items in stock</p>
          <p className="text-red-500 text-sm font-bold mt-1">
            {product?.stock <= 10 ? `Hurry! Only ${product?.stock} left!` : ""}
          </p>
        </div>

        <div className="space-y-2">
          <ul className="text-sm text-[#1A1A1A] space-y-1">
            <li>✔️ Free returns</li>
            <li>✔️ Free shipping via DHL, fully insured</li>
            <li>✔️ All taxes and customs duties included</li>
          </ul>

          <div className="flex gap-2 items-center">
            <div className="bg-gray-700 px-4 py-2 rounded-lg flex items-center gap-4">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-white text-lg">-</button>
              <span className="text-white">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="text-white text-lg">+</button>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded-lg shadow"
              onClick={handleAddToCart}
            >
              ADD TO CART 🛒
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
          >
            BUY THE ITEM NOW
          </motion.button>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <motion.div
        className="col-span-1 md:col-span-2 mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex gap-6 text-sm font-medium border-b border-gray-600 pb-2">
          <span className="text-white">Description</span>
          <span className="text-gray-400">Additional information</span>
          <span className="text-gray-400">Reviews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-sm text-gray-400">
          <p>
            {product?.fullDescription ||
              "Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
          <div className="bg-gray-300 h-40 rounded-lg flex items-center justify-center text-black text-xl font-bold">
            ▶
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {product?.additionalInfo ||
            "Lobortis rhoncus lltora pretium tempor mattis proin, auctor dis massa enim himenaeos. Torquent senectus dui vehicula libero cum vitae natoque magna commodo quam."}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;