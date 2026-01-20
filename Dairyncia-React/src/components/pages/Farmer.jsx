import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Farmer.css";

export default function Farmer() {
  const [profile, setProfile] = useState({});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // Fetch profile
        const profileRes = await api.get("/farmer/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(profileRes.data);

        // Fetch milk collections
        const recordsRes = await api.get("/farmer/milk-collections", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(recordsRes.data || []);
      } catch (err) {
        console.error("Farmer Dashboard API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h3>Loading Farmer Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="farmer-page">

      {/* PROFILE CARD */}
      <div className="profile-card">
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
            alt="Farmer"
          />
        </div>
        <div className="profile-right">
          <h2>{profile.fullName}</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>User ID:</strong> {profile.userId}</p>
          <p><strong>Farmer ID:</strong> {profile.farmerId || "N/A"}</p>
          <p><strong>Role:</strong> Farmer</p>
          <p><strong>Joined:</strong> {profile.createdAt ? profile.createdAt.slice(0,10) : "N/A"}</p>
        </div>
      </div>

      {/* MILK COLLECTIONS TABLE */}
      <div className="records-section">
        <h3>🥛 Previous Milk Collections</h3>
        <table className="records-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Milk Type</th>
              <th>Shift</th>
              <th>Quantity (L)</th>
              <th>Fat (%)</th>
              <th>SNF</th>
              <th>Rate/L (₹)</th>
              <th>Total (₹)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">No milk records found</td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>{r.milkType}</td>
                  <td>{r.milkShift}</td>
                  <td>{r.quantity}</td>
                  <td>{r.fatPercentage}</td>
                  <td>{r.snf}</td>
                  <td>{r.ratePerLiter}</td>
                  <td>{r.totalAmount}</td>
                  <td>{r.paymentStatus}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
