import React from "react";

function Register({ setIsLogin }) {
  return (
    <form action="">
      <div className="form">
        <h2>Register here</h2>
        <input type="text" placeholder="Name" />
        <input type="number" placeholder="Mobile No." />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button onClick={(e) => e.preventDefault()}>Register</button>
        <p>
          Already have an account?
          <a href="#" onClick={() => setIsLogin(true)}>
            Login
          </a>
        </p>
      </div>
    </form>
  );
}

export default Register;
