// src/api/orders.js
const BASE = 'http://localhost:5000/api/orders';
import axios from 'axios';

// Funksioni për të marrë porositë për një tavolinë
export const fetchOrders = async (tableId) => {
  try {
    const res = await fetch(`${BASE}/${tableId}`);

    if (!res.ok) {
      throw new Error('Error while getting orders');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};

// Funksioni për të krijuar një porosi të re
export const createOrder = async (orderData) => {
  try {
    const res = await fetch(BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error('Error creating order');
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to create order:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};

// Funksioni për të përditësuar statusin e porosisë
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(`${BASE}/${orderId}/status`, { status });
    return response.data;
  } catch (err) {
    console.error("Failed to update order status:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};
