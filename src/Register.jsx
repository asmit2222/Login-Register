import React, { useState } from "react";
import { useFormik } from "formik";
import { RegisterSchema } from "./Validations/RegisterValidation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const initialValues = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const provider = new GoogleAuthProvider();
function Register({ setIsLogin }) {
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
      },
      //  createUserWithEmailAndPassword(auth, values.email, values.password);
      //   const user = auth.currentUser;
      //   console.log(user);
      //   console.log("login success");
      // },
    });

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     setRegisterData({
  //       ...registerData,
  //       [name]: value,
  //     });
  //   };
  // const handleGoogleLogin = async (e) => {
  //   // e.preventDefault();
  //   await signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user);
  //       if (user) {
  //         setDoc(doc(db, "users", user.uid), {
  //           email: user.email,
  //           name: user.email,
  //           mobile: 789,
  //           password: "",
  //         });
  //       }
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       navigate("/profile");
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: values.name,
          mobile: values.mobile,
          password: values.password,
        });
      }
      toast.success("User registered successfully", { position: "top-center" });
      console.log("user registered success");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          handleSubmit(e);
          handleClick(e);
        }}
      >
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
