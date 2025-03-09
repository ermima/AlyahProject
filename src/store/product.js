import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProduct: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill in all fields" };
        }
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            if (!res.ok) {
                throw new Error("Failed to create product");
            }
            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully." };
        } catch (error) {
            console.error("Error creating product:", error.message);
            return { success: false, message: "Server error" };
        }
    },
    fetchProducts: async () => {
        try {
            const response = await fetch("/api/products");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            set({ products: data.data });
        } catch (error) {
            console.error("Error fetching products:", error.message);
        }
    },
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            // Update the UI immediately without needing refresh
            set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error deleting product:", error.message);
            return { success: false, message: "Server error" };
        }
    },
    updateProduct: async (updatedProduct) => {
        if (!updatedProduct._id || !updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            console.error("Missing fields:", updatedProduct);
            return { success: false, message: "Please fill in all fields" };
        }
        try {
            const res = await fetch(`/api/products/${updatedProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });
            if (!res.ok) {
                throw new Error("Failed to update product");
            }
            const data = await res.json();
            console.log("Product updated successfully:", data.data);
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === updatedProduct._id ? data.data : product
                )
            }));
            return { success: true, message: "Product updated successfully." };
        } catch (error) {
            console.error("Error updating product:", error.message);
            return { success: false, message: "Server error" };
        }
    }
}));
