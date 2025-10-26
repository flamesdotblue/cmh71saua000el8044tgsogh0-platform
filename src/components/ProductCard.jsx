import React from 'react';

export default function ProductCard({ product, onClick }) {
  return (
    <button onClick={onClick} className="group text-left bg-white rounded-lg overflow-hidden border border-neutral-200 hover:shadow-md transition">
      <div className="aspect-square overflow-hidden bg-neutral-100">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="text-xs text-neutral-500 capitalize">{product.gender} • {product.mainCategory}{product.subCategory ? ` • ${product.subCategory}` : ''}</div>
        <h3 className="mt-1 font-medium line-clamp-2 min-h-[2.75rem]">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">₹{product.price}</div>
          <div className="flex -space-x-1">
            {product.colors.slice(0,3).map((c) => (
              <span key={c} title={c} className="inline-block h-4 w-4 rounded-full ring-2 ring-white border border-neutral-200 capitalize" style={{ backgroundColor: colorToCss(c) }} />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

function colorToCss(c) {
  const map = {
    black: '#111827',
    white: '#f9fafb',
    grey: '#9ca3af',
    blue: '#3b82f6',
    red: '#ef4444',
    yellow: '#f59e0b',
    green: '#22c55e',
    brown: '#92400e',
    beige: '#f5f5dc',
    pink: '#ec4899',
    lavender: '#a78bfa',
  };
  return map[c] || '#e5e7eb';
}
