import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "./Validations/RegisterValidation";

const initialValues = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Register({ setIsLogin }) {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
      },
    });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     setRegisterData({
  //       ...registerData,
  //       [name]: value,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       console.log(registerData);
  //       await RegisterSchema.validate(registerData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register here</h2>
        <div className="error_container">
          {errors.name && touched.name && (
            <p className="form_error">{errors.name}</p>
          )}
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="error_container">
          {errors.mobile && touched.mobile && (
            <p className="form_error">{errors.mobile}</p>
          )}
        </div>
        <input
          type="number"
          placeholder="Mobile No."
          name="mobile"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
        />

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
          autoComplete="current-password"
        />

        <div className="error_container">
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="form_error">{errors.confirmPassword}</p>
          )}
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="current-password"
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?
          <a href="#" onClick={() => setIsLogin(true)}>
            Login
          </a>
        </p>
      </form>
    </>
  );
}

export default Register;
