// AdminDashboard.jsx (shembull)
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Merrni të gjithë përdoruesit nga backend
  const getUsers = async () => {
    const response = await fetch("http://localhost:5000/api/admin/users");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleUpdateRole(user.id, "waiter")}>
                  Set as Waiter
                </button>
                <button onClick={() => handleUpdateRole(user.id, "chef")}>
                  Set as Chef
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
