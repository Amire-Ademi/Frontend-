
import BootomNav from '@/components/shared/BootomNav';
import React, { useState, useEffect } from 'react'


const TablesList = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTables = async() => {
        try {
            const res = await fetch("http://localhost:5000/api/adminTable", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            setTables(data);
            setLoading(false);
        } catch (error) {
            console.log("Gabim gjate fetch:", error);
        }
    };

    const deleteTable = async (id) =>{
        try {
            await fetch(`http://localhost:5000/api/adminTable/delete/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            fetchTables();
        } catch (error) {
             console.error("Gabim gjatë fshirjes:", error);
        }
    }

    useEffect(() => {
    fetchTables();
  }, []);

  if (loading) return <p>Duke u ngarkuar...</p>;


  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem"}}>
        {tables.map((table) => (
            <div
            key={table.id}
            style={{padding: "1rem", borderRadius:"8px",
                color:"white",
                backgroundColor:
                table.status === "available"
                ? "green"
                : table.status === "reserved"
                ? "orange" : "red",
            }}>
       <p>Tavolina #{table.number}</p>
          <p>Statusi: {table.status}</p>
          <button onClick={() => deleteTable(table.id)}>Fshij</button>
           
          <BootomNav/>
        </div>
      ))}
      
    </div>
  );
};


  

export default TablesList;