import { useState, useEffect } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [viewDetails, setViewDetails] = useState({});

  useEffect(() => {
    const fetchOrdersFromStorage = async () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      // Fetch product details for each product in each order
      const ordersWithProductDetails = await Promise.all(
        storedOrders.map(async (order) => {
          const productsWithDetails = await Promise.all(
            order.products.map(async (product) => {
              const productDetails = await fetchProductDetails(
                product.productId
              );
              return {
                ...product,
                name: productDetails.title || "Unknown Product", // Store the product name
                image: productDetails.image || "", // Store the product image
              };
            })
          );
          return { ...order, products: productsWithDetails };
        })
      );

      setOrders(ordersWithProductDetails);
      setFilteredOrders(ordersWithProductDetails);
    };

    fetchOrdersFromStorage();
  }, []);

  // Fetch product details from FakeStore API
  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return { title: "Loading failed", image: "" }; // Fallback if error
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === status);
      setFilteredOrders(filtered);
    }
  };

  const handleViewDetails = (orderIndex) => {
    const currentView = viewDetails[orderIndex];
    if (currentView) {
      setViewDetails((prevDetails) => ({
        ...prevDetails,
        [orderIndex]: null,
      }));
    } else {
      const order = filteredOrders[orderIndex];
      setViewDetails((prevDetails) => ({
        ...prevDetails,
        [orderIndex]: order.products,
      }));
    }
  };

  const handleDeleteOrder = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
    setFilteredOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Order History
      </h1>

      <div className="mb-6 flex justify-center">
        <label htmlFor="statusFilter" className="mr-3 text-lg font-medium">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border p-2 rounded-lg bg-white shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Terminated">Terminated</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-xl text-gray-500 text-center">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredOrders.map((order, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                Order Date:{" "}
                <span className="text-blue-600">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                Status:{" "}
                <span
                  className={`${
                    order.status === "Active"
                      ? "text-green-600"
                      : order.status === "Scheduled"
                      ? "text-yellow-500"
                      : order.status === "Terminated"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  {order.status || "Active"}
                </span>
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                {order.products.map((product, idx) => (
                  <li key={idx} className="text-base">
                    <span className="font-medium text-gray-700">
                      Product Name:
                    </span>{" "}
                    {product.name},{" "}
                    <span className="font-medium text-gray-700">Quantity:</span>{" "}
                    {product.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-xl font-bold text-gray-800 mt-4">
                Total Price:{" "}
                <span className="text-blue-600">${order.total}</span>
              </p>
              <button
                className="mt-4 text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200"
                onClick={() => handleViewDetails(index)}
              >
                {viewDetails[index] ? "Hide Details" : "View Details"}
              </button>
              {viewDetails[index] && (
                <div className="mt-4 w-fit grid grid-cols-1 md:grid-cols-3 gap-4">
                  {viewDetails[index].map((product, idx) => (
                    <div key={idx} className="border p-4 rounded-lg">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-40 h-40 object-cover object-center" // Fixed width and height for square
                        style={{ width: "160px", height: "160px" }} // Square dimensions
                      />
                      <p className="text-center font-semibold">
                        {product.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <button
                className="mt-4 ml-4 text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                onClick={() => handleDeleteOrder(index)}
              >
                Delete Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
