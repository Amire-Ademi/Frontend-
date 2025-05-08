// src/api/tables.js
export const fetchTables = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/tables");

    if (!res.ok) {
      throw new Error("Error fetching tables");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch tables:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};

export const updateTableStatus = async (table) => {
  try {
    const res = await fetch(`http://localhost:5000/api/tables/${table.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        table_name: table.table_name,
        room_id: table.room_id,
        status: "pending", // tavolina do të jetë e rezervuar
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update table status");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to update table status:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};

export const markTableAvailable = async (tableId) => {
  try {
    const res = await fetch(`http://localhost:5000/api/tables/${tableId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Available' }) // Markojmë tavolinën si të disponueshme
    });

    if (!res.ok) {
      throw new Error('Could not update table status');
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to mark table as available:", err);
    throw err; // Ritheksojme gabimin për ta trajtuar në komponentin përkatës
  }
};
