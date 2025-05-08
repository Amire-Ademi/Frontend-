import React, { useState } from "react";
import axios from "axios";

const OrderForm = ({ tableId, onOrderCreated }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [waiterId, setWaiterId] = useState(1); // Assuming a default waiterId for now

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      table_id: tableId,
      items,
      total_price: totalPrice,
      waiter_id: waiterId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        newOrder
      );
      onOrderCreated(response.data); // Updating parent component with the new order
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Items</label>
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value.split(","))}
          placeholder="Item 1, Item 2, Item 3"
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Total Price</label>
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(Number(e.target.value))}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Submit Order
      </button>
    </form>
  );
};

export default OrderForm;
