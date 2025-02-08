'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { fetchProducts } from '@/lib/api';
import { Product } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

// ─── CUSTOM HOOK: Placeholder Typing Effect ───────────────────────────────
const useTypingEffect = (categories: string[]) => {
  const [typedPlaceholder, setTypedPlaceholder] = useState(
    'Search for "products"',
  );

  useEffect(() => {
    if (categories.length === 0) return;

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentCategory = categories[index] || 'products, brands and more';
    const baseText = 'Search for "';

    const typeEffect = () => {
      if (!isDeleting) {
        if (charIndex < currentCategory.length) {
          setTypedPlaceholder(
            baseText + currentCategory.slice(0, charIndex + 1) + '"',
          );
          charIndex++;
          setTimeout(typeEffect, 100);
        } else {
          isDeleting = true;
          setTimeout(typeEffect, 2000);
        }
      } else {
        if (charIndex > 0) {
          setTypedPlaceholder(
            baseText + currentCategory.slice(0, charIndex - 1) + '"',
          );
          charIndex--;
          setTimeout(typeEffect, 50);
        } else {
          isDeleting = false;
          index = (index + 1) % categories.length;
          currentCategory = categories[index] || 'Products';
          setTimeout(typeEffect, 500);
        }
      }
    };

    typeEffect();
  }, [categories]);

  return typedPlaceholder;
};

// ─── CUSTOM HOOK: Media Query (detect mobile view) ──────────────────────────
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}

// ─── SEARCHBAR COMPONENT ─────────────────────────────────────────────────────
export default function Searchbar() {
  // Declare isMobile first so it is available in subsequent callbacks
  const isMobile = useMediaQuery('(max-width: 1023px)');

  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch products on mount.
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    loadProducts();
  }, []);

  // Extract unique categories.
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  const typedPlaceholder = useTypingEffect(categories);

  // ── HANDLE SEARCH ─────────────────────────────────────────────
  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase();
      setQuery(value);

      if (value.length > 0) {
        // If the query exactly matches a category (ignoring case)
        if (categories.map((cat) => cat.toLowerCase()).includes(value)) {
          const filtered = products.filter(
            (product) => product.category.toLowerCase() === value,
          );
          setFilteredProducts(filtered);
        } else {
          const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(value),
          );
          setFilteredProducts(filtered);
        }
        setSelectedIndex(-1);
      } else {
        setFilteredProducts([]);
        setSelectedIndex(-1);
      }
    },
    [categories, products],
  );

  // ── HANDLE ITEM SELECTION ─────────────────────────────────────
  const handleSelect = useCallback(
    (product: Product) => {
      router.push(`/products/${product.id}`);
      setQuery('');
      setFilteredProducts([]);
      setSelectedIndex(-1);
    },
    [router],
  );

  // ── CLEAR SEARCH ──────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setQuery('');
    setFilteredProducts([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  }, []);

  // ── KEYBOARD NAVIGATION ─────────────────────────────────────────
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (filteredProducts.length === 0) return;

      if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredProducts.length - 1 ? prevIndex + 1 : prevIndex,
        );
      } else if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      } else if (event.key === 'Enter' && selectedIndex >= 0) {
        handleSelect(filteredProducts[selectedIndex]);
      } else if (event.key === 'Escape') {
        setFilteredProducts([]);
        setSelectedIndex(-1);
        setQuery('');
        if (isMobile) {
          setIsFullScreen(false);
        }
      }
    },
    [filteredProducts, handleSelect, selectedIndex, isMobile],
  );

  // ── Global key to focus search (desktop only) ──────────────────────
  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !isMobile) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isMobile]);

  // ── Scroll selected dropdown item into view (desktop) ─────────────
  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const selectedItem = dropdownRef.current.children[
        selectedIndex
      ] as HTMLElement;
      selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  return (
    <>
      {isMobile ? (
        // ── MOBILE VIEW: Show a clickable search preview that opens fullscreen ─
        <div className="mx-auto w-full max-w-lg px-2 lg:pt-4">
          <div
            className="flex cursor-pointer items-center rounded-full bg-gray-100 p-2 px-4 shadow-xs"
            onClick={() => {
              setIsFullScreen(true);
              setQuery('');
              setFilteredProducts([]);
              setSelectedIndex(-1);
            }}
          >
            <Search className="h-4 w-4 text-gray-500" />
            <span className="ml-2 line-clamp-1 flex-1 text-gray-500 w-25">
              {typedPlaceholder}
            </span>
          </div>
        </div>
      ) : (
        // ── DESKTOP VIEW: Render inline search bar with dropdown results ─
        <div className="relative mx-auto w-full max-w-lg px-4 pt-4 lg:max-w-xl lg:pt-0">
          <div className="relative flex w-full items-center rounded-full bg-gray-100 p-2 px-4 shadow-xs">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="w-full border-none bg-transparent px-2 text-sm text-gray-700 placeholder-gray-500 outline-hidden md:text-base"
              placeholder={typedPlaceholder}
            />
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {filteredProducts.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute top-14 left-0 z-10 max-h-60 w-full max-w-lg overflow-y-auto rounded border border-gray-300 bg-white shadow-lg lg:max-w-xl"
            >
              {filteredProducts.map((product, index) => (
                <li
                  key={product.id}
                  onClick={() => handleSelect(product)}
                  className={`cursor-pointer p-2 hover:bg-gray-100 ${
                    selectedIndex === index ? 'bg-gray-200' : ''
                  }`}
                >
                  {product.title} -{' '}
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── FULLSCREEN SEARCH MODAL FOR MOBILE ───────────────────────────── */}
      {isMobile && isFullScreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex items-center border-b p-4">
            <button
              onClick={() => {
                setIsFullScreen(false);
                setQuery('');
                setFilteredProducts([]);
                setSelectedIndex(-1);
              }}
              className="mr-2"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="grow">
              <div className="flex items-center rounded-full bg-gray-100 p-2 px-4 shadow-xs">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="w-full border-none bg-transparent px-2 text-base text-gray-700 placeholder-gray-500 outline-hidden"
                  placeholder={typedPlaceholder}
                />
                {query && (
                  <button
                    onClick={handleClear}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <ul className="divide-y">
                {filteredProducts.map((product, index) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      handleSelect(product);
                      setIsFullScreen(false);
                    }}
                    className={`cursor-pointer p-4 hover:bg-gray-100 ${
                      selectedIndex === index ? 'bg-gray-200' : ''
                    }`}
                  >
                    {product.title} -{' '}
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
