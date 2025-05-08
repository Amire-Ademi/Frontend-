import React, { useState } from "react";
import { createOrder } from "../services/orderService";

const OrderPage = () => {
  const [order, setOrder] = useState({ table_id: "", items: [] });

  const handleCreateOrder = () => {
    createOrder(order)
      .then((response) => {
        alert("Order placed successfully");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order");
      });
  };
//waitter per porosi te tavolinave
  return (
    <div>
      <h1>Create Order</h1>
      <input
        type="text"
        placeholder="Table ID"
        value={order.table_id}
        onChange={(e) => setOrder({ ...order, table_id: e.target.value })}
      />
 
      <button onClick={handleCreateOrder}>Place Order</button>
    </div>
  );
};

export default OrderPage;
