import React, { useEffect, useState } from "react";
import { fetchOrders, createOrder, updateOrderStatus } from "../../api/orders";
import { markTableAvailable } from "../../api/tables";


const Orders = ({ selectedTableId, waiterId }) => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([{ product_name: "", quantity: 1 }]);
  const [totalPrice, setTotalPrice] = useState(0);

 
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(selectedTableId);
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
    if (selectedTableId) loadOrders();
  }, [selectedTableId]);

  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };


  const handleAddItem = () => {
    setItems([...items, { product_name: "", quantity: 1 }]);
  };

  // krimi i nje order
  const handleCreateOrder = async () => {
    try {
      const orderData = {
        table_id: selectedTableId,
        items,
        total_price: totalPrice,
        waiter_id: waiterId,
      };
      const newOrder = await createOrder(orderData);
      setOrders([...orders, newOrder]);
      setItems([{ product_name: "", quantity: 1 }]);
      setTotalPrice(0);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

 
  const handleCompleteOrder = async (orderId) => {
    try {
      // Update order status to "Completed"
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Completed" }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order");
      }

      
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      await markTableAvailable(selectedTableId);
      alert("Order completed and table marked available.");
    } catch (err) {
      console.error("Error completing order:", err);
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Orders for Table #{selectedTableId}</h2>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Product name"
              value={item.product_name}
              onChange={(e) => handleItemChange(index, "product_name", e.target.value)}
              className="border p-2 w-1/2"
            />
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
              className="border p-2 w-20"
            />
          </div>
        ))}
        <button onClick={handleAddItem} className="bg-gray-300 px-3 py-1 rounded">
          + Add Product
        </button>
        <input
          type="number"
          placeholder="Total €"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
          className="border p-2 mt-2"
        />
        <button
          onClick={handleCreateOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Order
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Existing Orders</h3>
        {orders.map((order) => (
          <div key={order.id} className="border p-3 mt-2 rounded">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> €{order.total_price}</p>
            <div className="mt-1">
              <strong>Items:</strong>
              <ul className="list-disc list-inside">
                {order.items.map((item, i) => (
                  <li key={i}>{item.product_name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
            {order.status !== "Completed" && (
              <button
                onClick={() => handleCompleteOrder(order.id)}
                className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
              >
                Complete Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
