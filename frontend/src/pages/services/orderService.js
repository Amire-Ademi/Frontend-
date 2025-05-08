
//per krijimin e porosive

export const createOrder = async (order) => {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order), // dergon te dhenat e porosive
    });
  
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
  
    return await response.json();
  };
  // kerkesa Get per te marre nje list te porosive te regjistruara

  export const getOrders = async () => {
    const response = await fetch('/api/orders', {
      method: 'GET',
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
  
    return await response.json();
  };
  