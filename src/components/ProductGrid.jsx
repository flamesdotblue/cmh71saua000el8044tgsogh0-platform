import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onClickProduct, sortBy, setSortBy, countLabel }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-neutral-600">{countLabel}</div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-600">Sort by</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => onClickProduct(p)} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-neutral-500">No products found. Adjust filters to see more.</div>
      )}
    </div>
  );
}
