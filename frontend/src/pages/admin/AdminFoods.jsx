import React, { useEffect, useState } from 'react';
import BottomNav from '@/components/shared/BootomNav'; 

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({ name: "", image: "" });
  const [editId, setEditId] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/adminFoods");
      if (!res.ok) throw new Error("Failed to fetch foods.");
      const data = await res.json();
      setFoods(data);
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të ushqimeve:", error.message);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/adminFoods/update/${editId}`
      : `http://localhost:5000/api/adminFoods/create`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gabim gjatë ruajtjes.");
      }

      setForm({ name: "", image: "" });
      setEditId(null);
      fetchFoods();
    } catch (error) {
      console.error("Gabim gjatë ruajtjes:", error.message);
    }
  };

  const handleEdit = (foods) => {
    setForm({ name: foods.name, image: foods.image });
    setEditId(foods.id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("A je i sigurt që dëshiron ta fshish?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/adminFoods/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gabim gjatë fshirjes.");
      }

      fetchFoods();
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Foods</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type='text'
          placeholder='Name'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <input
          type='text'
          placeholder='Image URL'
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
          style={{ marginRight: '10px' }}
        />
        <button type='submit' disabled={!form.name || !form.image}>
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table border="1" cellPadding="6" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Orders</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((foods) => (
            <tr key={foods.id}>
              <td>{foods.id}</td>
              <td>{foods.name}</td>
              <td><img src={foods.image} alt={foods.name} width="60" /></td>
              <td>{foods.number_of_orders || 0}</td>
              <td>
                <button onClick={() => handleEdit(foods)} style={{ marginRight: '8px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(foods.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BottomNav />
    </div>
  );
};

export default AdminFoods;
