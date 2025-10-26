import React, { useEffect, useMemo, useState } from 'react';
import FiltersSidebar from './components/FiltersSidebar';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';

// Mock product dataset
const PRODUCTS = [
  // Men's Footwear
  {
    id: 'p1',
    title: 'Bacca Bucci Zephyr - All Day Comfort Running Shoes',
    slug: 'bacca-bucci-zephyr-all-day-comfort-running-training-shoes',
    gender: 'men',
    mainCategory: 'footwear',
    subCategory: 'running',
    price: 2999,
    colors: ['black', 'grey'],
    sizes: ['6', '7', '8', '9', '10'],
    popularity: 92,
    createdAt: '2024-10-01',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p2',
    title: 'Bacca Bucci Trailblaze Hiking Boots',
    slug: 'bacca-bucci-trailblaze-hiking-boots',
    gender: 'men',
    mainCategory: 'footwear',
    subCategory: 'boots',
    price: 3999,
    colors: ['brown', 'black'],
    sizes: ['7', '8', '9', '10', '11'],
    popularity: 81,
    createdAt: '2024-09-18',
    image: 'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1200&auto=format&fit=crop',
  },
  // Men's Clothing
  {
    id: 'p3',
    title: "Men's Performance Tee",
    slug: 'mens-performance-tee',
    gender: 'men',
    mainCategory: 'clothing',
    subCategory: 't-shirts',
    price: 1299,
    colors: ['white', 'black', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    popularity: 74,
    createdAt: '2024-07-02',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca3e?q=80&w=1200&auto=format&fit=crop',
  },
  // Men's Accessories
  {
    id: 'p4',
    title: 'Classic Leather Belt',
    slug: 'classic-leather-belt',
    gender: 'men',
    mainCategory: 'accessories',
    subCategory: 'belts',
    price: 899,
    colors: ['brown', 'black'],
    sizes: ['M', 'L', 'XL'],
    popularity: 63,
    createdAt: '2024-08-18',
    image: 'https://images.unsplash.com/photo-1593030761757-61b088f7b16f?q=80&w=1200&auto=format&fit=crop',
  },

  // Women's Footwear
  {
    id: 'p5',
    title: 'Stride Knit Sneakers',
    slug: 'stride-knit-sneakers',
    gender: 'women',
    mainCategory: 'footwear',
    subCategory: 'sneakers',
    price: 2799,
    colors: ['white', 'pink', 'grey'],
    sizes: ['4', '5', '6', '7', '8'],
    popularity: 88,
    createdAt: '2024-10-16',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p6',
    title: 'Urban Chic Sandals',
    slug: 'urban-chic-sandals',
    gender: 'women',
    mainCategory: 'footwear',
    subCategory: 'sandals',
    price: 1599,
    colors: ['beige', 'black'],
    sizes: ['4', '5', '6', '7'],
    popularity: 69,
    createdAt: '2024-06-10',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop',
  },
  // Women's Clothing
  {
    id: 'p7',
    title: "Women's Lightweight Hoodie",
    slug: 'womens-lightweight-hoodie',
    gender: 'women',
    mainCategory: 'clothing',
    subCategory: 'hoodies',
    price: 1999,
    colors: ['black', 'lavender', 'blue'],
    sizes: ['XS', 'S', 'M', 'L'],
    popularity: 77,
    createdAt: '2024-09-25',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca3e?q=80&w=1200&auto=format&fit=crop',
  },
  // Women's Accessories
  {
    id: 'p8',
    title: 'Minimalist Cap',
    slug: 'minimalist-cap',
    gender: 'women',
    mainCategory: 'accessories',
    subCategory: 'caps',
    price: 699,
    colors: ['white', 'black'],
    sizes: ['One Size'],
    popularity: 57,
    createdAt: '2024-03-05',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1200&auto=format&fit=crop',
  },

  // Kids Footwear
  {
    id: 'p9',
    title: 'Kids Sprint Sneakers',
    slug: 'kids-sprint-sneakers',
    gender: 'kids',
    mainCategory: 'footwear',
    subCategory: 'sneakers',
    price: 1499,
    colors: ['red', 'blue', 'yellow'],
    sizes: ['10K', '11K', '12K', '13K', '1'],
    popularity: 70,
    createdAt: '2024-05-01',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
  },
  // Kids Clothing
  {
    id: 'p10',
    title: 'Kids Graphic Tee',
    slug: 'kids-graphic-tee',
    gender: 'kids',
    mainCategory: 'clothing',
    subCategory: 't-shirts',
    price: 799,
    colors: ['blue', 'green'],
    sizes: ['XS', 'S', 'M'],
    popularity: 61,
    createdAt: '2024-02-11',
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
  },
  // Kids Accessories
  {
    id: 'p11',
    title: 'Kids Sports Cap',
    slug: 'kids-sports-cap',
    gender: 'kids',
    mainCategory: 'accessories',
    subCategory: 'caps',
    price: 499,
    colors: ['red', 'blue'],
    sizes: ['One Size'],
    popularity: 55,
    createdAt: '2024-01-20',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?q=80&w=1200&auto=format&fit=crop',
  },

  // More Men's footwear
  {
    id: 'p12',
    title: 'Street Flex Sneakers',
    slug: 'street-flex-sneakers',
    gender: 'men',
    mainCategory: 'footwear',
    subCategory: 'sneakers',
    price: 2499,
    colors: ['white', 'black'],
    sizes: ['7', '8', '9', '10'],
    popularity: 84,
    createdAt: '2024-10-20',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p13',
    title: 'Aero Mesh Trainers',
    slug: 'aero-mesh-trainers',
    gender: 'men',
    mainCategory: 'footwear',
    subCategory: 'running',
    price: 3199,
    colors: ['blue', 'grey'],
    sizes: ['7', '8', '9', '10', '11'],
    popularity: 79,
    createdAt: '2024-08-01',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
  },
  // Women's accessories
  {
    id: 'p14',
    title: 'Everyday Tote Bag',
    slug: 'everyday-tote-bag',
    gender: 'women',
    mainCategory: 'accessories',
    subCategory: 'bags',
    price: 1299,
    colors: ['black', 'beige'],
    sizes: ['One Size'],
    popularity: 72,
    createdAt: '2024-07-30',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
  },
];

const ALL_COLORS = Array.from(
  new Set(PRODUCTS.flatMap((p) => p.colors))
).sort();

const DEFAULT_PRICE = [0, 5000];

export default function App() {
  const [gender, setGender] = useState(null); // 'men' | 'women' | 'kids' | null
  const [categories, setCategories] = useState({
    men: ['footwear', 'clothing', 'accessories'],
    women: ['footwear', 'clothing', 'accessories'],
    kids: ['footwear', 'clothing', 'accessories'],
  });
  const [activeCategories, setActiveCategories] = useState([]); // array of mainCategory names selected
  const [sizes, setSizes] = useState([]); // selected sizes
  const [colors, setColors] = useState([]); // selected colors
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE);
  const [sortBy, setSortBy] = useState('popularity'); // popularity | price-asc | price-desc | newest
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);

  // URL sync helpers
  const applyPath = (path) => {
    // /collections, /collections/:gender, /products/:slug
    const parts = path.split('?')[0].split('/').filter(Boolean);
    if (parts[0] === 'products' && parts[1]) {
      setSelectedProductSlug(parts.slice(1).join('/'));
      setGender(null);
      return;
    }
    setSelectedProductSlug(null);
    if (parts[0] === 'collections') {
      setGender(parts[1] || null);
    } else {
      setGender(null);
    }
  };

  useEffect(() => {
    applyPath(window.location.pathname);
    const onPopState = () => applyPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToCollection = (g) => {
    const path = g ? `/collections/${g}` : '/collections';
    window.history.pushState({}, '', path);
    applyPath(path);
  };

  const navigateToProduct = (slug) => {
    const path = `/products/${slug}`;
    window.history.pushState({}, '', path);
    applyPath(path);
  };

  // When gender toggles from Filters, update URL
  const handleGenderChange = (g) => {
    if (g === gender) {
      navigateToCollection(null);
    } else {
      navigateToCollection(g);
    }
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;

    if (selectedProductSlug) return list;

    if (gender) list = list.filter((p) => p.gender === gender);

    if (activeCategories.length > 0) {
      list = list.filter((p) => activeCategories.includes(p.mainCategory));
    }

    if (sizes.length > 0) {
      list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    }

    if (colors.length > 0) {
      list = list.filter((p) => p.colors.some((c) => colors.includes(c)));
    }

    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        list = [...list].sort((a, b) => b.popularity - a.popularity);
    }

    return list;
  }, [gender, activeCategories, sizes, colors, priceRange, sortBy, selectedProductSlug]);

  const product = useMemo(() => {
    if (!selectedProductSlug) return null;
    return PRODUCTS.find((p) => p.slug === selectedProductSlug) || null;
  }, [selectedProductSlug]);

  const clearAllFilters = () => {
    setActiveCategories([]);
    setSizes([]);
    setColors([]);
    setPriceRange(DEFAULT_PRICE);
    setSortBy('popularity');
  };

  // Title bar info
  const title = 'Collection';
  const subtitle = gender ? `${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection` : "Men's, Women's & Kids' Collection";

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <span className="text-sm text-neutral-500">{subtitle}</span>
          </div>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <button onClick={() => navigateToCollection(null)} className={`px-3 py-1.5 rounded-full border ${!gender ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>All</button>
            <button onClick={() => navigateToCollection('men')} className={`px-3 py-1.5 rounded-full border ${gender==='men' ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>Men</button>
            <button onClick={() => navigateToCollection('women')} className={`px-3 py-1.5 rounded-full border ${gender==='women' ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>Women</button>
            <button onClick={() => navigateToCollection('kids')} className={`px-3 py-1.5 rounded-full border ${gender==='kids' ? 'border-neutral-900 text-neutral-900' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>Kids</button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3">
          <FiltersSidebar
            gender={gender}
            onGenderChange={handleGenderChange}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            sizes={sizes}
            setSizes={setSizes}
            colors={colors}
            setColors={setColors}
            allColors={ALL_COLORS}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            clearAll={clearAllFilters}
          />
        </aside>

        {/* Product Grid or Product Detail */}
        <section className="lg:col-span-9">
          {product ? (
            <ProductDetail
              product={product}
              onBack={() => {
                const path = gender ? `/collections/${gender}` : '/collections';
                window.history.pushState({}, '', path);
                applyPath(path);
              }}
            />
          ) : (
            <ProductGrid
              products={filteredProducts}
              onClickProduct={(p) => navigateToProduct(p.slug)}
              sortBy={sortBy}
              setSortBy={setSortBy}
              countLabel={`${filteredProducts.length} products`}
            />
          )}
        </section>
      </main>

      {/* Footer nav mimic */}
      <footer className="border-t border-neutral-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 flex flex-wrap gap-3">
          <span>Categories:</span>
          <button onClick={() => setActiveCategories(['footwear'])} className="underline underline-offset-4 hover:text-neutral-800">Footwear</button>
          <button onClick={() => setActiveCategories(['clothing'])} className="underline underline-offset-4 hover:text-neutral-800">Clothing</button>
          <button onClick={() => setActiveCategories(['accessories'])} className="underline underline-offset-4 hover:text-neutral-800">Accessories</button>
        </div>
      </footer>
    </div>
  );
}
