import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function UserDetails() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const fetchUser = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `https://api.slingacademy.com/v1/sample-data/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();

        setUser(data.user);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }
    };

    fetchUser();

  }, [id]);


  if (loading) {
    return (
      <div className="loading">
        Loading user details...
      </div>
    );
  }


  if (error) {
    return (
      <div className="error">
        {error}
        <br />

        <Link to="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    );
  }


  if (!user) {
    return (
      <div>
        User not found
      </div>
    );
  }


  return (

    <div className="details-container">

      <Link
        className="back-btn"
        to="/dashboard"
      >
        ← Back to Dashboard
      </Link>


      <div className="details-card">

        <img
          src={user.profile_picture}
          alt={`${user.first_name} ${user.last_name}`}
        />

        <h1>
          {user.first_name} {user.last_name}
        </h1>

        <p>
          <strong>User ID:</strong> {user.id}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Phone:</strong> {user.phone}
        </p>

        <p>
          <strong>Gender:</strong> {user.gender}
        </p>

        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(user.date_of_birth).toLocaleDateString()}
        </p>

        <p>
          <strong>Job:</strong> {user.job}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {user.street}
        </p>

        <p>
          <strong>City:</strong>{" "}
          {user.city}
        </p>

        <p>
          <strong>State:</strong>{" "}
          {user.state}
        </p>

        <p>
          <strong>Country:</strong>{" "}
          {user.country}
        </p>

        <p>
          <strong>ZIP Code:</strong>{" "}
          {user.zipcode}
        </p>

      </div>

    </div>

  );
}

export default UserDetails;