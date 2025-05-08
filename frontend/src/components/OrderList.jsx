import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = ({ tableId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/${tableId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (tableId) {
      fetchOrders();
    }
  }, [tableId]);

  return (
    <div className="space-y-4">
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg">{order.items.join(", ")}</h3>
            <p>Status: {order.status}</p>
          </div>
        ))
      ) : (
        <p>No orders for this table yet.</p>
      )}
    </div>
  );
};

export default OrderList;
