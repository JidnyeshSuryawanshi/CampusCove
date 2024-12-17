import React, { useState } from "react";
import {
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaPlus,
  FaCheckCircle,
  FaListAlt,
  FaSearch,
  FaTrashAlt,
  FaBuilding,
  FaEdit,
  FaCalendarAlt,
} from "react-icons/fa";

export function BusinessDashboard() {
  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", type: "Hotel", amount: "$200", status: "Pending", date: "2024-12-01" },
    { id: 2, customer: "Jane Smith", type: "Gym", amount: "$150", status: "Completed", date: "2024-12-02" },
    { id: 3, customer: "Sam Wilson", type: "Ice Cream", amount: "$25", status: "Pending", date: "2024-12-03" },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", contact: "john@example.com", phone: "123-456-7890", address: "123 Main St", orders: 3 },
    { id: 2, name: "Jane Smith", contact: "jane@example.com", phone: "987-654-3210", address: "456 Oak St", orders: 5 },
    { id: 3, name: "Sam Wilson", contact: "sam@example.com", phone: "555-555-5555", address: "789 Pine St", orders: 2 },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    phone: "",
    address: "",
  });

  const [newOrder, setNewOrder] = useState({
    customer: "",
    type: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const handlePaymentReceived = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Completed" } : order
      )
    );
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomerData = {
      ...newCustomer,
      id: customers.length + 1,
      orders: 0,
    };
    setCustomers((prev) => [...prev, newCustomerData]);
    setNewCustomer({ name: "", contact: "", phone: "", address: "" });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrderData = {
      ...newOrder,
      id: orders.length + 1,
    };
    setOrders((prev) => [...prev, newOrderData]);
    setNewOrder({ customer: "", type: "", amount: "", status: "Pending", date: "" });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-5 animate-fade-in">
        <FaClipboardList className="text-green-500 w-10 h-10 animate-bounce" />
        <span className="hover:text-green-500 transition-all duration-300">
          Business Management Dashboard
        </span>
      </h2>

      {/* Orders Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaListAlt className="text-green-500" /> Orders
        </h3>
        <ul className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <li
                key={order.id}
                className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-green-600">
                      Customer: {order.customer}
                    </h4>
                    <p className="text-gray-700">Type: {order.type}</p>
                    <p className="text-gray-700">Amount: {order.amount}</p>
                    <p className="text-gray-700">Status: {order.status}</p>
                    <p className="text-gray-700">Date: {order.date}</p>
                  </div>
                  <div className="flex gap-3">
                    {order.status !== "Completed" && (
                      <button
                        onClick={() => handlePaymentReceived(order.id)}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
                      >
                        <FaCheckCircle /> Mark as Paid
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No orders available.</p>
          )}
        </ul>
      </div>

      {/* Customers Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaUsers className="text-green-500" /> Customers
        </h3>
        <ul className="space-y-4">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <li
                key={customer.id}
                className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-all"
              >
                <h4 className="text-lg font-semibold text-green-600">{customer.name}</h4>
                <p className="text-gray-700">Email: {customer.contact}</p>
                <p className="text-gray-700">Phone: {customer.phone}</p>
                <p className="text-gray-700">Address: {customer.address}</p>
                <p className="text-gray-700">Total Orders: {customer.orders}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No customers available.</p>
          )}
        </ul>

        {/* Add Customer Form */}
        <form
          onSubmit={handleAddCustomer}
          className="mt-6 bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h3 className="text-lg font-semibold text-green-600">Add New Customer</h3>
          <div>
            <label htmlFor="customerName" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="customerName"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="customerEmail" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="customerEmail"
              value={newCustomer.contact}
              onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="customerPhone" className="block font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="customerPhone"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="customerAddress" className="block font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="customerAddress"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              required
              className="              w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
          >
            <FaPlus className="inline-block mr-2" /> Add Customer
          </button>
        </form>
      </div>

      {/* Add Order Section */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaMoneyBillWave className="text-green-500" /> Add New Order
        </h3>
        <form
          onSubmit={handleAddOrder}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label htmlFor="orderCustomer" className="block font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              id="orderCustomer"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="orderType" className="block font-medium text-gray-700">
              Order Type
            </label>
            <input
              type="text"
              id="orderType"
              value={newOrder.type}
              onChange={(e) => setNewOrder({ ...newOrder, type: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="orderAmount" className="block font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              id="orderAmount"
              value={newOrder.amount}
              onChange={(e) =>
                setNewOrder({ ...newOrder, amount: e.target.value })
              }
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label htmlFor="orderDate" className="block font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="orderDate"
              value={newOrder.date}
              onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
              required
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
          >
            <FaPlus className="inline-block mr-2" /> Add Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusinessDashboard;
