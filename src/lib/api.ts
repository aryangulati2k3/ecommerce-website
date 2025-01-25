export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
};
