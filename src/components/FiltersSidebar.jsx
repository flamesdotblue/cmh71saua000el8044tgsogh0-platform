import React, { useMemo, useState } from 'react';

export default function FiltersSidebar({
  gender,
  onGenderChange,
  activeCategories,
  setActiveCategories,
  sizes,
  setSizes,
  colors,
  setColors,
  allColors,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  clearAll,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (cat) => {
    if (activeCategories.includes(cat)) {
      setActiveCategories(activeCategories.filter((c) => c !== cat));
    } else {
      setActiveCategories([...activeCategories, cat]);
    }
  };

  const sizeOptions = useMemo(() => [
    '4','5','6','7','8','9','10','11','XS','S','M','L','XL','10K','11K','12K','13K','1','One Size'
  ], []);

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="border-b border-neutral-200 py-4">
        <button className="w-full flex items-center justify-between" onClick={() => setOpen(!open)}>
          <span className="font-medium text-sm tracking-wide">{title}</span>
          <span className="text-neutral-500 text-xl leading-none">{open ? '−' : '+'}</span>
        </button>
        {open && <div className="mt-3 space-y-2">{children}</div>}
      </div>
    );
  };

  return (
    <div className="lg:sticky lg:top-20">
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          className="w-full flex items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters & Sort'}
        </button>
      </div>

      <div className={`${showFilters ? 'block' : 'hidden'} lg:block rounded-lg border border-neutral-200 bg-white p-4`}>
        {/* Gender - Bacca Bucci style checkboxes acting like radios */}
        <FilterSection title="Gender" defaultOpen>
          {['men','women','kids'].map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={gender === g}
                onChange={() => onGenderChange(g)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-0"
              />
              <span className="capitalize">{g}</span>
            </label>
          ))}
          <div className="pt-2">
            <button onClick={() => onGenderChange(gender)} className="text-xs text-neutral-500 underline underline-offset-4">
              {gender ? 'Clear gender' : 'All genders'}
            </button>
          </div>
        </FilterSection>

        {/* Category */}
        <FilterSection title="Category" defaultOpen>
          {['footwear','clothing','accessories'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={activeCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-0"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
          <div className="pt-2">
            <button onClick={() => setActiveCategories([])} className="text-xs text-neutral-500 underline underline-offset-4">Clear category</button>
          </div>
        </FilterSection>

        {/* Size */}
        <FilterSection title="Size" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => {
              const active = sizes.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => setSizes(active ? sizes.filter((x) => x !== s) : [...sizes, s])}
                  className={`px-3 py-1.5 rounded-full border text-xs ${active ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <div className="pt-2">
            <button onClick={() => setSizes([])} className="text-xs text-neutral-500 underline underline-offset-4">Clear size</button>
          </div>
        </FilterSection>

        {/* Colour */}
        <FilterSection title="Colour" defaultOpen={false}>
          <div className="flex flex-wrap gap-2">
            {allColors.map((c) => {
              const active = colors.includes(c);
              return (
                <button
                  key={c}
                  onClick={() => setColors(active ? colors.filter((x) => x !== c) : [...colors, c])}
                  className={`px-3 py-1.5 rounded-full border text-xs capitalize ${active ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-300 text-neutral-700 hover:border-neutral-400'}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <div className="pt-2">
            <button onClick={() => setColors([])} className="text-xs text-neutral-500 underline underline-offset-4">Clear colour</button>
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" defaultOpen>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={5000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-700">
            <span>₹{priceRange[0]}</span>
            <span>to</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <div className="pt-2">
            <button onClick={() => setPriceRange([0, 5000])} className="text-xs text-neutral-500 underline underline-offset-4">Reset price</button>
          </div>
        </FilterSection>

        {/* Sort By */}
        <div className="py-4">
          <label className="text-sm font-medium block mb-2">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Clear all */}
        <div className="pt-2 flex gap-2">
          <button onClick={clearAll} className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white hover:bg-neutral-50">Clear all</button>
        </div>
      </div>
    </div>
  );
}
