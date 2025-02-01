import React, { useState } from "react";

import { useFormik } from "formik";
import { LoginSchema } from "./Validations/LoginValidation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const initialValues = {
  email: "",
  password: "",
};

function Login({ setIsLogin }) {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: LoginSchema,
      onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
      },
    });

  const navigate = useNavigate();

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;

  //     setLoginData({
  //       ...loginData,
  //       [name]: value,
  //     });
  //   };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // toast.success("user Login successfully", { position: "top-center" });
      // window.location.href = "/Login-Register/profile";

      navigate("/profile");
      console.log("user login sucess");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        mobile: "",
        password: "",
        providerId: user.providerId,
      });

      // Navigate to user page after successful Google login
      navigate("/profile");
      console.log("Google login success");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <>
      <form
        action=""
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
          handleClick(e);
        }}
      >
        <h2>Enter Login Details</h2>
        <div className="error_container">
          {errors.email && touched.email && (
            <p className="form_error">{errors.email}</p>
          )}
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="error_container">
          {errors.password && touched.password && (
            <p className="form_error">{errors.password}</p>
          )}
        </div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <a href="#">Forget Password?</a>
        <button type="submit">Login</button>

        <p>
          Not have an account?
          <a href="#" onClick={() => setIsLogin(false)}>
            Register
          </a>
          <br />
          <span className="or">or</span>
        </p>
      </form>

      <button className="googleLoginBtn" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </>
  );
}

export default Login;
