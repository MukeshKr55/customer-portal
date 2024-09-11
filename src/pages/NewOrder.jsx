import { useState, useEffect } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

const NewOrder = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-20">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Browse Equipment
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        <div className="fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
        </div>
      </main>
    </div>
  );
};

export default NewOrder;
