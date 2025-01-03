import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characer required")
    .required("Required"),
});
