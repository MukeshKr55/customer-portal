import { Link } from "react-router-dom";
import {
  FaClipboardList,
  FaHistory,
  FaFileInvoice,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = ({ onSignOut }) => {
  return (
    <aside className="lg:w-96 w-60 h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white fixed left-0 top-0 p-6 shadow-lg">
      <div className="mb-10 text-3xl font-bold text-center">
        <Link className="cursor-pointer tracking-wide" to="/main-menu">
          Customer Portal
        </Link>
      </div>
      <ul className="space-y-6">
        <li>
          <Link
            to="/new-order"
            className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-600 p-3 rounded-lg transition duration-200 ease-in-out"
          >
            <FaClipboardList className="text-yellow-400" />
            <span>New Order</span>
          </Link>
        </li>
        <li>
          <Link
            to="/order-history"
            className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-600 p-3 rounded-lg transition duration-200 ease-in-out"
          >
            <FaHistory className="text-blue-400" />
            <span>Order History</span>
          </Link>
        </li>
        <li>
          <Link
            to="/invoice"
            className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-600 p-3 rounded-lg transition duration-200 ease-in-out"
          >
            <FaFileInvoice className="text-green-400" />
            <span>Invoice</span>
          </Link>
        </li>
        <li>
          {/* Trigger sign-out on click */}
          <Link to="/">
            <button
              onClick={onSignOut}
              className="w-full flex items-center space-x-3 bg-gray-800 hover:bg-gray-600 p-3 rounded-lg transition duration-200 ease-in-out"
            >
              <FaSignOutAlt className="text-red-400" />
              <span>Sign Out</span>
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;
