// src/components/EditProfile.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //   const history = useHistory();

  // Fetch user data from Firebase when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const userData = docSnap.data();
          setName(userData.name || "");
          setMobile(userData.mobile || "");
          setEmail(userData.email || "");
        }
      }
    };
    fetchUserData();
  }, []);

  // Handle form submission to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name: name,
          mobile: mobile,
          email: email,
        });
        toast.success("User updated successfully", { position: "top-center" });
        navigate("/profile");
        // history.push("/profile"); // Redirect to the profile page
      } catch (error) {
        console.error("Error updating profile: ", error);
        toast.error("User not updated", { position: "top-center" });
      }
    }
    setLoading(false);
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
