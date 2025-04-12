const SortingBar = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <p className="text-sm">Sort Products</p>
      <select className="border rounded px-2 py-1" onChange={handleSortChange}>
        <option value="default">Default Sorting</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortingBar;