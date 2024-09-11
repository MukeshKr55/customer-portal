const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border border-gray-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="h-48 w-full object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md shadow-md">
          {product.category}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-extrabold text-gray-800 truncate">
          {product.title}
        </h2>
        <p className="text-xl font-semibold text-green-600">${product.price}</p>
      </div>
      <button
        onClick={onAddToCart}
        className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
