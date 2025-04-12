const categoriesList = [
  { label: "Men's Shirts", value: "mens-shirts" },
  { label: "Men's Shoes", value: "mens-shoes" },
  { label: "Men's Watches", value: "mens-watches" },
  { label: "Women's Dresses", value: "womens-dresses" },
  { label: "Women's Shoes", value: "womens-shoes" },
  { label: "Women's Watches", value: "womens-watches" },
  { label: "Women's Bags", value: "womens-bags" },
  { label: "Women's Jewellery", value: "womens-jewellery" },
  { label: "Sunglasses", value: "sunglasses" },
];

const sizeOptions = ["S", "M", "L", "XL", "XXL"]; // ✅ Example sizes

const FilterSidebar = ({ filters, setFilters, onApplyFilters, brandList }) => {
  // Toggle category selection
  const toggleCategory = (category) => {
    setFilters((prev) => {
      const alreadySelected = prev.categories.includes(category);
      const updated = alreadySelected
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories: updated };
    });
  };

  // Toggle brand selection
  const toggleBrand = (brand) => {
    setFilters((prev) => {
      const alreadySelected = prev.brands.includes(brand);
      const updated = alreadySelected
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: updated };
    });
  };

  // Toggle size selection
  const toggleSize = (size) => {
    setFilters((prev) => {
      const alreadySelected = prev.sizes.includes(size);
      const updated = alreadySelected
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: updated };
    });
  };

  // Update price value
  const updatePrice = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: Number(e.target.value),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="text-sm space-y-1 max-h-60 overflow-y-auto pr-2">
          {categoriesList.map((cat) => (
            <li key={cat.value}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat.value)}
                  onChange={() => toggleCategory(cat.value)}
                />
                <span>{cat.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-2">Filter by price (max)</h3>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={filters.price}
          onChange={updatePrice}
          className="w-full"
        />
        <p className="text-sm text-gray-700">Up to ${filters.price}</p>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-2">Brands</h3>
        <ul className="text-sm space-y-1 max-h-48 overflow-y-auto pr-2">
          {brandList.map((brand) => (
            <li key={brand}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-2">Sizes</h3>
        <ul className="text-sm space-y-1 max-h-32 overflow-y-auto pr-2">
          {sizeOptions.map((size) => (
            <li key={size}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleSize(size)}
                />
                <span>{size}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Filters Button */}
      <div>
        <button
          onClick={onApplyFilters}
          className="bg-red-500 text-white px-3 py-2 w-full rounded hover:bg-red-600 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;