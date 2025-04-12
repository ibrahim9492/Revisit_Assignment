import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoryItem from "./CategoryItem";

export default function CategoryList() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    updateScrollButtons();
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
    }

    return () => {
      if (el) el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, []);

  const categories = [
    { name: "WOMEN WEAR", isActive: false, image: "Women.jpg" },
    { name: "SHOES COLLECTION", isActive: false, image: "Shoe.jpg"},
    { name: "BAG COLLECTION", isActive: false, image: "Bag.jpg" },
    { name: "WATCHES", isActive: false, image: "Watch.jpg" },
    { name: "ACCESSORIES", isActive: false, image: "Accessories.jpg" },
    { name: "SUNGLASSES", isActive: false, image: "Sunglass.jpg" }
  ];

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-20">
      {/* Header and Scroll Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            BEST FOR YOUR CATEGORIES
          </h2>
          <p className="text-gray-500 text-sm">
            29 categories belonging to a total 15,892 products
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`p-2 rounded-full transition ${
              canScrollLeft
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`p-2 rounded-full transition ${
              canScrollRight
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scrollable Category List */}
      <div
        ref={scrollRef}
        className="mt-4 flex overflow-x-auto gap-4 py-2"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            name={category.name}
            isActive={category.isActive}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}