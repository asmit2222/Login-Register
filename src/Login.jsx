import React from "react";

function Login({ setIsLogin }) {
  return (
    <form action="">
      <div className="form">
        <h2>Enter Login Details</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <a href="#">Forget Password?</a>
        <button onClick={(e) => e.preventDefault()}>Login</button>
        <p>
          Not have an account?
          <a href="#" onClick={() => setIsLogin(false)}>
            Register
          </a>
        </p>
      </div>
    </form>
  );
}

export default Login;
