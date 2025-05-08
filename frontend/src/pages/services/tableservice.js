//per krijimin e tavolinave

export const createTable = async (room_id, table_number) => {
    const response = await fetch('/api/tables/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room_id, table_number }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create table');
    }
  
    return await response.json();
  };
  // per marrjen e tavolinave 

  export const getTables = async () => {
    const response = await fetch('/api/tables', {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch tables');
    }
  
    return await response.json();
  };

  