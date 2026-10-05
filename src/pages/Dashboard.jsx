import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // Fetch users
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.slingacademy.com/v1/sample-data/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setUsers(data.users);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

    fetchUsers();

  }, []);


  // Logout
  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    navigate("/login");

  };


  // Search
  const filteredUsers = users.filter((user) => {

    const searchText = search.toLowerCase();

    return (
      user.first_name.toLowerCase().includes(searchText) ||
      user.last_name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.job.toLowerCase().includes(searchText)
    );

  });


  return (
    <div>

      {/* Navbar */}

      <nav className="navbar">

        <h2>User Management</h2>

        <div>

          <span>
            Users: {users.length}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </nav>


      <main className="dashboard">

        <h1>Dashboard</h1>

        <p>Manage and view users</p>


        {/* Search */}

        <input
          className="search-box"
          type="text"
          placeholder="Search by name, email or job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        {/* Loading */}

        {loading && (
          <div className="loading">
            Loading users...
          </div>
        )}


        {/* Error */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}


        {/* Users */}

        {!loading && !error && (

          <div className="user-grid">

            {filteredUsers.map((user) => (

              <div
                className="user-card"
                key={user.id}
              >

                <img
                  src={user.profile_picture}
                  alt={`${user.first_name} ${user.last_name}`}
                />

                <h3>
                  {user.first_name} {user.last_name}
                </h3>

                <p>{user.email}</p>

                <p>
                  <strong>Job:</strong> {user.job}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {user.city}, {user.country}
                </p>


                <Link
                  className="details-btn"
                  to={`/user/${user.id}`}
                >
                  View Details
                </Link>

              </div>

            ))}

          </div>

        )}


        {!loading &&
          !error &&
          filteredUsers.length === 0 && (

            <div className="no-users">
              No users found.
            </div>

          )}

      </main>

    </div>
  );
}

export default Dashboard;