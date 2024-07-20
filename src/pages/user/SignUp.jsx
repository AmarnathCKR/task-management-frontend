/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../../schema/userValidater";
import { PostAnyApi } from "../../api/api";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Swal from "sweetalert2";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignUpButton from "../../utils/GoogleSignUpButton";
import { CircleSpinner } from "react-spinners-kit";
const MySwal = Swal;

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",

      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      setLoading(true);
      PostAnyApi("user/signup", {
        email: values.email,
        name: values.name,
        password: values.password,
      })
        .then((res) => {
          setLoading(false);

          MySwal.fire({
            title: "Success",
            text: `You have successfully created an account`,
            icon: "success",
          });
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.data.errors[0].message);
          setLoading(false);
        })
        .finally(() => console.log("success"));
    },
  });

  return (
    <div className="flex flex-col items-center text-white h-screen align-middle justify-center">
      <div className="bg-[#1E1E1E] p-16 mx-auto  z-10 w-[350px] md:w-[400px] flex flex-col justify-center rounded-lg items-center opacity-70">
        <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-8">
          SIGN UP
        </h1>

        <Input
          onChange={formik.handleChange}
          value={formik.values.name}
          required
          placeholder="NAME"
          class="text-sm"
          name="name"
          type="text"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500">{formik.errors.name}</div>
        )}
        <Input
          onChange={formik.handleChange}
          value={formik.values.email}
          required
          placeholder="EMAIL ADDRESS"
          class="text-sm"
          name="email"
          type="text"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}

        <Input
          onChange={formik.handleChange}
          value={formik.values.password}
          required
          placeholder="PASSWORD"
          class="text-sm"
          name="password"
          type="password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-red-500">{formik.errors.password}</div>
        )}

        <p className="text-slate-500 mb-1 text-[10px] md:text-sm mt-5">
          By Joining Up you accept the Terms and Conditions of example.com
        </p>
        <div className="text-center text-red-500 tracking-wide font-semibold">
          {error}
        </div>
        {loading && (
          <div className="z-[999]  p-64 loader-local ">
            {" "}
            <CircleSpinner size={50} color="#000000" loading={props.loading} />
          </div>
        )}
        <Button
          class="md:mt-10 mt-5 w-full"
          outline
          color="transparent"
          onClick={formik.handleSubmit}
        >
          SIGN UP
        </Button>
        <p>
          <p className="text-center mb-3 mt-3">or</p>
          <Link to="/login">
            <GoogleOAuthProvider
              clientId={
                "635264642318-284aift53keao63nan68r055p302hmjv.apps.googleusercontent.com"
              }
            >
              <GoogleSignUpButton setError={setError} />
            </GoogleOAuthProvider>
          </Link>
        </p>
        <p>
          Already a user?
          <Link to="/login">
            <button type="button" className="p-2 text-blue-600 my-2">
              Sign In
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
