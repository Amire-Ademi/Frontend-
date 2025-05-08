import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    tableNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      ...formData,
      status: "in progress", // default për fillim
    };

    // Me backend më vonë: dërgo POST request
    console.log("Order sent:", newOrder);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Create New Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="tableNumber">Table Number</Label>
          <Input
            id="tableNumber"
            name="tableNumber"
            type="number"
            value={formData.tableNumber}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-[#60183f] text-white">
          Submit Order
        </Button>
      </form>
    </div>
  );
};

export default CreateOrder;
