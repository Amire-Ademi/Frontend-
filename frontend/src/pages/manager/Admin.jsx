const handleUpdateRole = async (userId, newRole) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/admin/update-role",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, newRole }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      alert(`Role of user updated to ${newRole}`);
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error updating role:", error);
  }
};
