// src/pages/MainMenu.jsx
import { useEffect, useState } from "react";

const MainMenu = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex justify-center items-start p-8">
      <div className="bg-white shadow-md rounded-lg p-6 w-2/3">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">Date</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">${order.total.toFixed(2)}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${getOrderStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// Helper function to apply status-specific styles
const getOrderStatusStyle = (status) => {
  switch (status) {
    case "Active":
      return "text-green-500";
    case "Scheduled":
      return "text-yellow-500";
    case "Terminated":
      return "text-red-500";
    case "Cancelled":
      return "text-gray-500";
    default:
      return "";
  }
};

export default MainMenu;
