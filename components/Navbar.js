import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "@/context/CartSlice";
import { motion } from "framer-motion";

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="w-full">
      {/* Top Header */}
      <motion.div
        className="bg-[#E53E3E] text-white text-xs sm:text-sm py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0 text-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap justify-center md:justify-start space-x-3 md:space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">My Account</a>
          <a href="#" className="hover:underline">Wishlist</a>
          <a href="#" className="hover:underline">Checkout</a>
        </div>
        <span className="text-white px-2">Free shipping for all orders of $150</span>
        <div className="flex flex-wrap justify-center md:justify-end space-x-3 md:space-x-4">
          <a href="#" className="hover:underline">Store Location</a>
          <a href="#" className="hover:underline">Language ▾</a>
          <a href="#" className="hover:underline">Currency ▾</a>
        </div>
      </motion.div>

      {/* Middle Header */}
      <motion.div
        className="bg-white text-black py-4 px-4 md:px-6 flex flex-col lg:flex-row justify-between items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-[#E53E3E] text-2xl font-bold">🛒 ROISER</span>
        </div>

        <div className="w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col sm:flex-row w-full">
            <select className="bg-gray-200 text-black px-3 py-2 border border-gray-300 rounded-t-md sm:rounded-l-md sm:rounded-t-none focus:outline-none text-sm sm:w-auto">
              <option>All Categories</option>
            </select>
            <input
              type="text"
              placeholder="Search Keywords..."
              className="flex-grow px-3 py-2 border border-gray-300 focus:outline-none text-sm"
            />
            <a
              href="#"
              className="bg-[#E53E3E] text-white px-4 py-2 rounded-tr-lg rounded-br-lg font-semibold text-sm flex items-center justify-center"
            >
              SEARCH HERE
            </a>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <span>📞</span>
            <span className="text-gray-500 hidden sm:inline">Call Us Now:</span>
            <span className="font-semibold">+(258) 2159-2159</span>
          </div>

          <span className="text-xl">❤️</span>
          <Link href="/cart">
            <div className="relative text-xl bg-red-100 cursor-pointer px-2 py-1 rounded-md hover:scale-105 transition-transform">
              <span>🛒</span>
              <span className="absolute -top-2 right-12 bg-[#E53E3E] text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
              <span className="font-semibold text-sm">${cartTotal.toFixed(2)}</span>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Bottom Header */}
      <motion.div
        className="bg-[#1A1A1A] text-white w-[95%] mx-auto mt-2 mb-2 rounded-lg shadow-md border border-gray-700 overflow-hidden px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-medium text-sm px-2">
          <Link href="/" className="hover:text-[#E53E3E] whitespace-nowrap cursor-pointer">HOME</Link>
          <Link href="/shop" className="hover:text-[#E53E3E] whitespace-nowrap cursor-pointer">SHOP</Link>
          <Link href="/women" className="hover:text-[#E53E3E] whitespace-nowrap">WOMEN</Link>
          <Link href="/men" className="hover:text-[#E53E3E] whitespace-nowrap">MEN</Link>
          <Link href="/pages" className="hover:text-[#E53E3E] whitespace-nowrap">PAGES</Link>
          <Link href="/blog" className="hover:text-[#E53E3E] whitespace-nowrap">BLOG</Link>
          <Link href="/contact" className="hover:text-[#E53E3E] whitespace-nowrap">CONTACT</Link>
        </nav>
        <a
          href="#"
          className="bg-[#E53E3E] text-white px-4 py-2 rounded-lg font-semibold text-xs md:text-sm flex items-center justify-center mx-auto md:mx-0 w-fit"
        >
          Get 30% Discount Now
          <span className="bg-white text-[#E53E3E] text-[10px] font-bold ml-2 px-2 py-1 rounded">
            SALE
          </span>
        </a>
      </motion.div>
    </div>
  );
}