import React, { useState } from "react";

import { useFormik } from "formik";
import { LoginSchema } from "./Validations/LoginValidation";

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
  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;

  //     setLoginData({
  //       ...loginData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await LoginSchema.validate(loginData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
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
      <button type="submit" onClick={(e) => e.preventDefault()}>
        Login
      </button>
      <p>
        Not have an account?
        <a href="#" onClick={() => setIsLogin(false)}>
          Register
        </a>
      </p>
    </form>
  );
}

export default Login;
