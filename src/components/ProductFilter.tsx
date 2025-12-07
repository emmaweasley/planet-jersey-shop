interface ProductFilterProps {
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
}

const filterTypes = [
  { value: null, label: 'All Kits' },
  { value: 'home', label: 'Home' },
  { value: 'away', label: 'Away' },
  { value: 'third', label: 'Third' },
  { value: 'fourth', label: 'Fourth' },
];

const ProductFilter = ({ selectedType, onTypeChange }: ProductFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filterTypes.map((filter) => (
        <button
          key={filter.value ?? 'all'}
          onClick={() => onTypeChange(filter.value)}
          className={`filter-btn ${
            selectedType === filter.value
              ? 'filter-btn-active'
              : 'filter-btn-inactive'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default ProductFilter;
