const Pagination = ({ currentPage, onPageChange, totalProducts, productsPerPage }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="flex flex-wrap justify-start mt-6 gap-2 sm:gap-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          className={`min-w-[40px] sm:min-w-[44px] px-3 py-1 sm:py-2 rounded text-sm sm:text-base transition ${
            currentPage === i + 1
              ? "bg-red-500 text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {String(i + 1).padStart(2, "0")}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className="min-w-[40px] sm:min-w-[44px] px-3 py-1 sm:py-2 border border-gray-300 rounded text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition"
          onClick={() => onPageChange(currentPage + 1)}
        >
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;