import React from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div
      className="relative h-[500px] bg-cover bg-center flex items-center justify-end px-10"
      style={{ backgroundImage: "url('/SliderImage/bg-img.png')" }}
    >
      {/* Model Image on Left */}
      <motion.img
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        src="/SliderImage/model-img.png"
        alt="Model"
        className="absolute left-40 bottom-0 h-[500px] object-contain hidden md:block"
      />

      {/* Text Section on Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full md:w-[40%] text-left text-white z-10 ml-auto"
      >
        <p className="text-sm text-red-500 font-semibold">
          SUMMER 22 WOMEN’S COLLECTION
        </p>
        <h1 className="text-5xl text-[#1A1A1A] font-bold mt-2 leading-tight">
          SUPER COLLECTION FOR WOMEN
        </h1>
        <p className="text-lg text-[#1A1A1A] mt-2">
          From <span className="text-red-500 font-bold">$320.00</span>
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 text-white px-6 py-3 rounded-lg mt-4 text-lg font-semibold"
        >
          View Collections
        </motion.button>
      </motion.div>
    </div>
  );
}