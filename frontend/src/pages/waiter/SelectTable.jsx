import React, { useState, useEffect } from "react";
import { fetchTables, updateTableStatus } from "../../api/tables"; 
import Orders from './Orders';

const SelectTable = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [selectedTableId, setSelectedTableId] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const result = await fetchTables();
        setTables(result); 
      } catch (error) {
        console.error("Gabim gjatë marrjes së tavolinave.", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData(); 
  }, []);

  const handleTableSelect = async (table) => {
    try {
      await updateTableStatus(table); 
      alert("Tavolina u rezervua me sukses!");
      setTables((prevTables) =>
        prevTables.map((t) =>
          t.id === table.id ? { ...t, status: "pending" } : t
        )
      );
      setSelectedTableId(table.id); // <- Kjo është pjesa që mungonte
    } catch (error) {
      console.error("Gabim gjatë ndryshimit të statusit të tavolinës.", error);
    }
  };

  if (selectedTableId) {
    return <Orders selectedTableId={selectedTableId} waiterId={1} />; // Zëvendëso 1 me currentUser.id nese perdor autentikim
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {loading ? (
        <div>Loading...</div> 
      ) : (
        tables.map((table) => (
          <div
            key={table.id}
            className={`border p-4 ${
              table.status === "pending" ? "bg-yellow-400" : "bg-green-400"
            } ${selectedTableId === table.id ? "bg-blue-400" : ""}`} 
          >
            <h3>{table.name}</h3>
            <button
              className="mt-2"
              disabled={table.status === "pending"}
              onClick={() => handleTableSelect(table)}
            >
              {table.status === "pending"
                ? "Tavolina është e zënë."
                : "Zgjidh Tavolinën"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SelectTable;
