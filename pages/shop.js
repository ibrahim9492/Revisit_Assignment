import { useEffect, useState } from "react";
import FilterSidebar from "@/components/ProductListing/FilterSidebar";
import Pagination from "@/components/ProductListing/Pagination";
import ProductCard from "@/components/ProductListing/ProductCard";
import SortingBar from "@/components/ProductListing/SortingBar";

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default");

  const [filters, setFilters] = useState({
    categories: [],
    price: 1000,
    brands: [],
    sizes: [],
  });

  const productsPerPage = 6;

  const relevantCategories = [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
  ];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryPromises = relevantCategories.map((category) =>
          fetch(`https://dummyjson.com/products/category/${category}`).then((res) =>
            res.json()
          )
        );
        const results = await Promise.all(categoryPromises);

        const allFetchedProducts = Array.from(
          new Map(
            results.flatMap((result) => result.products).map((p) => [p.id, p])
          ).values()
        );

        const uniqueBrands = [
          ...new Set(allFetchedProducts.map((product) => product.brand)),
        ].sort();

        const categoryCountMap = results.reduce((acc, result) => {
          const categoryName = result.category;
          acc[categoryName] = result.products.length;
          return acc;
        }, {});

        setAllProducts(allFetchedProducts);
        setBrandList(uniqueBrands);
        setCategoryCounts(categoryCountMap);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = () => {
    const filtered = allProducts.filter((product) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.some((cat) =>
          product.category
            .toLowerCase()
            .replace(/\s+/g, "-")
            .includes(cat.toLowerCase().replace(/\s+/g, "-"))
        );

      const matchPrice = product.price <= filters.price;
      const matchBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);
      const matchSize =
        filters.sizes.length === 0 ||
        filters.sizes.some((size) =>
          (product.description + product.title)
            .toLowerCase()
            .includes(size.toLowerCase())
        );

      return matchCategory && matchPrice && matchBrand && matchSize;
    });

    const sorted = sortProducts(filtered, sortOrder);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  };

  const sortProducts = (products, order) => {
    const sorted = [...products];
    if (order === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (order === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = sortProducts(filteredProducts, order);
    setFilteredProducts(sorted);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [allProducts]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="w-[95%] mx-auto mt-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product List */}
        <div className="w-full md:w-3/4 space-y-4">
          <SortingBar
            onSortChange={handleSortChange}
            totalResults={filteredProducts.length}
          />

          {loading ? (
            <p>Loading products...</p>
          ) : currentItems.length === 0 ? (
            <p>No products match your filters.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    reviews={product.rating}
                    brand={product.brand}
                    image={product.thumbnail}
                    slug={product.id}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
              />
            </>
          )}
        </div>

        {/* Filter Sidebar */}
        <aside className="w-full md:w-1/4">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            onApplyFilters={applyFilters}
            brandList={brandList}
            categoryCounts={categoryCounts}
          />
        </aside>
      </div>
    </div>
  );
}