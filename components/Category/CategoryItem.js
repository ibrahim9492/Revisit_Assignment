import React from "react";

export default function CategoryCard({ name, isActive, image }) {
  return (
    <div
      className={`min-w-[220px] sm:min-w-[220px] md:min-w-[220px] h-[220px] sm:h-[260px] md:h-[260px] 
                  flex flex-col items-center justify-end text-center p-3 rounded-lg shadow-sm transition-all
                  ${isActive ? "bg-red-500 text-white" : "bg-gray-100 text-black"}`}
    >
      {/* Category Image */}
      <img
        src={`${image}`}
        alt={name}
        className="w-full h-[200px] sm:h-[200px] md:h-[220px] object-cover rounded-md"
      />

      {/* Category Name */}
      <p className="mt-3 font-semibold text-sm sm:text-base">{name}</p>
    </div>
  );
}