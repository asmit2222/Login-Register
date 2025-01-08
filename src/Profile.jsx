import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  const fetchUserData = async (e) => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      //   window.location.href = "/Login-Register/";
      navigate("/");

      toast.warn("Logout Successfully", { position: "top-center" });
    } catch (error) {
      console.log("Error logOut");
    }
  }

  return (
    <div>
      {userDetails ? (
        <>
          <h3>Welcome {userDetails.name}</h3>
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Mobile: {userDetails.mobile}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
          <Link to="/edit-profile">Edit Profile</Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
