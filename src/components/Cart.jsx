import { useState } from "react";

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);

  const statuses = ["Active", "Scheduled", "Terminated", "Cancelled"];

  const getRandomStatus = () => {
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);

    const newOrderData = {
      userId: 1,
      date: new Date().toISOString(),
      products: cartItems.map((item) => ({ productId: item.id, quantity: 1 })),
      total: totalAmount,
      status: getRandomStatus(),
      paid: false,
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const updatedOrders = [...existingOrders, newOrderData];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      const existingInvoices =
        JSON.parse(localStorage.getItem("invoices")) || [];

      const updatedInvoices = [...existingInvoices, newOrderData];

      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

      const response = await fetch("https://fakestoreapi.com/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderData),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderSuccess(true);
        alert("Order successfully submitted!");
      } else {
        throw new Error("Order submission failed");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("There was an error submitting your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-lg shadow-lg w-96 transition-all transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
      <h2 className="text-xl font-extrabold mb-4 text-gray-800 border-b pb-2">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </p>
                  <p className="text-gray-500">${item.price}</p>
                </div>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Remove
              </button>
            </div>
          ))}
          {/* Total Price */}
          <div className="text-right mt-4">
            <p className="text-xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-green-500">${totalAmount.toFixed(2)}</span>
            </p>
            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className={`mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md transform hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out ${
                isSubmitting ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-pulse">Submitting...</span>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
            {orderSuccess && (
              <p className="text-green-500 mt-4 text-lg font-semibold">
                🎉 Order placed successfully!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
