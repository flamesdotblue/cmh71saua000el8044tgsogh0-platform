import React from 'react';

export default function ProductDetail({ product, onBack }) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm bg-white hover:bg-neutral-50">Back to Collection</button>
          <div className="text-sm text-neutral-500 capitalize">{product.gender} • {product.mainCategory}{product.subCategory ? ` • ${product.subCategory}` : ''}</div>
        </div>
        <div className="text-sm text-neutral-600">SKU: {product.id.toUpperCase()}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div className="aspect-square bg-neutral-100">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold leading-tight">{product.title}</h2>
          <div className="mt-2 text-neutral-500 text-sm capitalize">{product.gender}'s Collection • {product.mainCategory}{product.subCategory ? ` • ${product.subCategory}` : ''}</div>
          <div className="mt-4 text-3xl font-semibold">₹{product.price}</div>

          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Available Colours</div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <span key={c} className="h-6 w-6 rounded-full border border-neutral-300" title={c} style={{ backgroundColor: colorToCss(c) }} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Available Sizes</div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full border border-neutral-300 text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full sm:w-auto rounded-md bg-neutral-900 text-white px-6 py-3 text-sm hover:bg-neutral-800">Add to Cart</button>
          </div>

          <div className="mt-8 text-sm text-neutral-600 leading-6">
            Crafted for everyday comfort and performance. This product features breathable materials and durable construction inspired by Bacca Bucci's urban-athletic aesthetic. Perfect for daily wear, training, and beyond.
          </div>
        </div>
      </div>
    </div>
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
