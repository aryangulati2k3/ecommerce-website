"use client";

import { useState, useEffect, useRef } from "react";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

export default function Searchbar() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [typedPlaceholder, setTypedPlaceholder] = useState(
        'Search for "Products"'
    );
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const dropdownRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts();

            // Extract unique categories from products
            const uniqueCategories = Array.from(
                new Set(productsData.map((p) => p.category))
            );
            setCategories(uniqueCategories);
            setProducts(productsData);
        };
        loadProducts();
    }, []);

    // Typing effect for placeholder
    useEffect(() => {
        if (categories.length === 0) return;

        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentCategory = categories[index] || "Products";
        const baseText = 'Search for "';

        const typeEffect = () => {
            if (!isDeleting) {
                if (charIndex < currentCategory.length) {
                    setTypedPlaceholder(
                        baseText + currentCategory.slice(0, charIndex + 1) + '"'
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
                        baseText + currentCategory.slice(0, charIndex - 1) + '"'
                    );
                    charIndex--;
                    setTimeout(typeEffect, 50);
                } else {
                    isDeleting = false;
                    index = (index + 1) % categories.length;
                    currentCategory = categories[index] || "Products";
                    setTimeout(typeEffect, 500);
                }
            }
        };

        typeEffect();
    }, [categories]);

    // Search functionality: Filter products by category or product title
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setQuery(value);

        if (value.length > 0) {
            // Check if input matches a category
            if (categories.includes(value)) {
                const filtered = products.filter(
                    (product) => product.category.toLowerCase() === value
                );
                setFilteredProducts(filtered);
            } else {
                // Otherwise, search by product title
                const filtered = products.filter((product) =>
                    product.title.toLowerCase().includes(value)
                );
                setFilteredProducts(filtered);
            }
            setSelectedIndex(-1);
        } else {
            setFilteredProducts([]);
            setSelectedIndex(-1);
        }
    };

    const handleSelect = (product: Product) => {
        router.push(`/products/${product.id}`);
        setQuery("");
        setFilteredProducts([]);
        setSelectedIndex(-1);
    };

    const handleClear = () => {
        setQuery("");
        setFilteredProducts([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (filteredProducts.length === 0) return;

        if (event.key === "ArrowDown") {
            setSelectedIndex((prevIndex) =>
                prevIndex < filteredProducts.length - 1
                    ? prevIndex + 1
                    : prevIndex
            );
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            handleSelect(filteredProducts[selectedIndex]);
        } else if (event.key === "Escape") {
            setFilteredProducts([]);
            setSelectedIndex(-1);
            setQuery("");
        }
    };

    useEffect(() => {
        const handleGlobalKeyDown = (event: KeyboardEvent) => {
            if (event.key === "/") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleGlobalKeyDown);
        return () => {
            document.removeEventListener("keydown", handleGlobalKeyDown);
        };
    }, []);

    useEffect(() => {
        if (dropdownRef.current && selectedIndex >= 0) {
            const selectedItem = dropdownRef.current.children[
                selectedIndex
            ] as HTMLElement;
            selectedItem?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }, [selectedIndex]);

    return (
        <div className="relative w-full max-w-lg lg:max-w-xl mx-auto px-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm w-full relative">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none px-2 text-gray-700 placeholder-gray-500 text-sm md:text-base"
                    placeholder={typedPlaceholder}
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {filteredProducts.length > 0 && (
                <ul
                    ref={dropdownRef}
                    className="absolute top-14 left-0 w-full max-w-lg lg:max-w-xl bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-10"
                >
                    {filteredProducts.map((product, index) => (
                        <li
                            key={product.id}
                            onClick={() => handleSelect(product)}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${
                                selectedIndex === index ? "bg-gray-200" : ""
                            }`}
                        >
                            {product.title} -{" "}
                            <span className="text-sm text-gray-500">
                                {product.category}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
