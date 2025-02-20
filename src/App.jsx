import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import { auth } from "./firebase";
function App() {
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  // }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/profile/" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
