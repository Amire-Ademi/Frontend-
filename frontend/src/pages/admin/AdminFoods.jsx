import React, { useEffect, useState } from 'react'

const AdminFoods = () => {
    const [foods, setFoods] = useState([]);
    const [form, setForm] = useState({ name: "", image: ""});
    const [editId, setEditId] = useState(null);


    const fetchFoods = async () => {
        const res = await fetch("http://localhost:5000/api/foods", {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        const data = await res.json();
        setFoods(data);
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editId ? "PUT" : "POST";
        const url = editId ? `http://localhost:5000/api/foods/update/${editId}`
                         : `http://localhost:5000/api/foods/create`;

        await fetch(url, {
            method,
            headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(form),
        });

        setForm({ name: "", image: ""});
        setEditId(null);
        fetchFoods();
    };

    const handleEdit = (foods) => {
        setForm({name: foods.name, image:foods.image });
        setEditId(foods.id);
    };


    const handleDelete = async (id) =>{ 
        await fetch(`http://localhost:5000/api/foods/delete/${id}`,{
            method: "DELETE",
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
        fetchFoods();
    };



  return (
    <div>
        <h2>Manage Foods</h2>

        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value })}/>

            <input type='text' placeholder='Image URL' value={form.image}
            onChange={(e) => setForm({...form, image: e.target.value })}/>

            <button type='submit'>{editId ? "Update" : "Add"}</button>
        </form>

          <table border="1" cellPadding="6" style={{ marginTop: "20px", width: "100%" }}>
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
                        <td><img src={foods.image} width="60" /></td>
                        <td>{foods.number_of_orders}</td>

                        <td>
                            <button onClick={() => handleEdit(foods)}>Edit</button>
                            <button onClick={() => handleDelete(foods.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
  )
}

export default AdminFoods