import React from "react";

const TableCard = ({ table }) => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-xl">{table.table_name}</h3>
      <p>Status: {table.status}</p>
    </div>
  );
};

export default TableCard;
