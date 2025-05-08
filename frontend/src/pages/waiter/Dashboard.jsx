import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const menuItems = [
  { id: 1, name: "French Vanilla Fantasy", price: 12.83 },
  { id: 2, name: "Almond Amore", price: 9.23 },
  { id: 3, name: "Cinnamon Swirl", price: 8.49 },
  { id: 4, name: "Irish Cream Infusion", price: 11.83 },
];

export default function WaiterDashboard() {
  const [order, setOrder] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const addToOrder = (item) => {
    setOrder((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const updateQty = (id, delta) => {
    setOrder((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => {
    setOrder((prev) => prev.filter((item) => item.id !== id));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Bill Summary", 10, 10);
    order.forEach((item, idx) => {
      doc.text(
        `${item.name} - $${item.price.toFixed(2)} x ${item.qty}`,
        10,
        20 + idx * 10
      );
    });
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, 20 + order.length * 10);
    doc.text(`Tax (12%): $${tax.toFixed(2)}`, 10, 30 + order.length * 10);
    doc.text(`Total: $${total.toFixed(2)}`, 10, 40 + order.length * 10);
    doc.save("bill.pdf");
  };

  const subtotal = order.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {/* Menu */}
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <div className="grid gap-4">
          {menuItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <Button onClick={() => addToOrder(item)}>+</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Order Details */}
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4">
          {order.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h4>{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)} x {item.qty}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => updateQty(item.id, -1)}>-</Button>
                  <Button onClick={() => updateQty(item.id, 1)}>+</Button>
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Payment Section */}
      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (12%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
            className="w-full mt-4"
            onClick={() => setShowPaymentModal(true)}
          >
            Pay Now
          </Button>
          <Button variant="outline" className="w-full" onClick={generatePDF}>
            Open Bill
          </Button>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate("/select-table")}
          >
            Select Table
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent>
          <DialogTitle>Payment Information</DialogTitle>
          <DialogDescription>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const name = form.cardName.value.trim();
                const number = form.cardNumber.value.trim();
                const expiry = form.expiry.value.trim();
                const pin = form.pin.value.trim();

                const nameRegex = /^[a-zA-Z\s]{2,}$/;
                const cardNumberRegex = /^\d{16}$/;
                const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // vetem muaj 01–12 dhe vit me 2 shifra
                const pinRegex = /^\d{3}$/; // vetem 3 shifra

                if (
                  !nameRegex.test(name) ||
                  !cardNumberRegex.test(number) ||
                  !expiryRegex.test(expiry) ||
                  !pinRegex.test(pin)
                ) {
                  alert("Please fill out all fields correctly.");
                  return;
                }

                setShowPaymentModal(false);
                setShowSuccessModal(true);
              }}
            >
              <div>
                <label className="block text-sm font-medium"> Name</label>
                <input
                  name="cardName"
                  className="w-full border rounded-md p-2 mt-1"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Card Number</label>
                <input
                  name="cardNumber"
                  className="w-full border rounded-md p-2 mt-1"
                  placeholder="1234567812345678"
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">
                    Expiry (MM/YY)
                  </label>
                  <input
                    name="expiry"
                    className="w-full border rounded-md p-2 mt-1"
                    placeholder="04/26"
                    maxLength={5}
                    pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium">PIN</label>
                  <input
                    name="pin"
                    type="password"
                    className="w-full border rounded-md p-2 mt-1"
                    placeholder="123"
                    maxLength={3}
                    pattern="^\d{3}$"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Pay</Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Payment Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent>
          <DialogTitle className="text-green-600 text-center">
            Payment Successful 🎉
          </DialogTitle>
          <DialogDescription className="text-center">
            <p className="mt-2 mb-4">
              Your payment of <strong>${total.toFixed(2)}</strong> was processed
              successfully.
            </p>
            <div className="flex justify-center">
              <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
