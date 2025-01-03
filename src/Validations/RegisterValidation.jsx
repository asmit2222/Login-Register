import * as yup from "yup";

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("required field"),
  mobile: yup.string().required("required field"),
  email: yup.string().email().required("required field"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("required field"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("required field"),
});
