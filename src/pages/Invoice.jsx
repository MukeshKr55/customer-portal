import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchInvoicesFromStorage = () => {
      const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
      setInvoices(storedInvoices);
    };

    fetchInvoicesFromStorage();
  }, []);

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

    if (status === "") {
      setInvoices(storedInvoices);
    } else {
      const filtered = storedInvoices.filter(
        (invoice) => invoice.paid === (status === "Paid")
      );
      setInvoices(filtered);
    }
  };

  const handleExportToPDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(
      `Invoice Date: ${new Date(invoice.date).toLocaleDateString()}`,
      10,
      10
    );
    doc.text(`Status: ${invoice.paid ? "Paid" : "Unpaid"}`, 10, 20);
    doc.text("Products:", 10, 30);

    invoice.products.forEach((product, index) => {
      doc.text(
        `${index + 1}. Product ID: ${product.productId}, Quantity: ${
          product.quantity
        }`,
        10,
        40 + index * 10
      );
    });

    doc.text(`Total: $${invoice.total}`, 10, 80);
    doc.save(`invoice_${invoice.date}.pdf`);
  };

  const handleMarkAsPaid = (index) => {
    const updatedInvoices = [...invoices];
    updatedInvoices[index].paid = true;
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        Invoices
      </h1>

      <div className="mb-6 flex justify-center">
        <label htmlFor="statusFilter" className="mr-3 text-lg font-semibold">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-lg shadow-lg"
        >
          <option value="">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      {invoices.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No invoices found.</p>
      ) : (
        <ul>
          {invoices.map((invoice, index) => (
            <li
              key={index}
              className="mb-6 p-6 bg-white rounded-lg shadow-xl transition duration-300 hover:shadow-2xl transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Invoice Date:{" "}
                <span className="font-normal">
                  {new Date(invoice.date).toLocaleDateString()}
                </span>
              </h2>
              <p
                className={`text-lg mb-3 ${
                  invoice.paid ? "text-green-600" : "text-red-600"
                }`}
              >
                Status: {invoice.paid ? "Paid" : "Unpaid"}
              </p>
              <ul className="pl-4 mb-3">
                {invoice.products.map((product) => (
                  <li
                    key={product.productId}
                    className="text-gray-700 text-lg font-light"
                  >
                    <span className="font-medium">Product:</span> ID:{" "}
                    {product.productId}, Quantity: {product.quantity}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-xl text-gray-900">
                Total: ${invoice.total}
              </p>

              <div className="flex justify-between mt-6">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 hover:bg-blue-600"
                  onClick={() => handleExportToPDF(invoice)}
                >
                  Export to PDF
                </button>

                {!invoice.paid && (
                  <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition duration-200 hover:bg-green-600"
                    onClick={() => handleMarkAsPaid(index)}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Invoice;
