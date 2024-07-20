import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { subscribeToken, subscribeUser } from "../../store/index";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { loginSchema } from "../../schema/userValidater";
import { useFormik } from "formik";
import { PostAnyApi } from "../../api/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "../../utils/GoogleLoginButton";
import { CircleSpinner } from "react-spinners-kit";

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);

      PostAnyApi("user/login", {
        email: values.email,
        password: values.password,
      })
        .then((res) => {
          setLoading(false);

          localStorage.setItem(
            "token",
            res.data.data.content.meta.access_token
          );
          dispatch(subscribeToken(res.data.data.content.meta.access_token));
          localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.content.data)
          );
          dispatch(subscribeUser(res.data.data.content.data));
        })
        .catch((err) => {
          setLoading(false);

          console.log(err);
          setError(err.response.data.data.errors[0].message);
        });
    },
  });
  const navigate = useNavigate();

  console.log(error);

  return (
    <>
      <div className="flex flex-col h-screen text-white items-center align-middle justify-center">
        <div className="bg-[#1E1E1E] p-16 mx-auto  z-10 w-[350px] md:w-[400px] flex flex-col justify-center rounded-lg items-center opacity-70">
          <h1 className="text-white z-10 md:text-5xl text-3xl tracking-wide pb-8">
            LOG IN
          </h1>
          <Input
            onChange={(event) => {
              formik.handleChange(event);
              setError("");
            }}
            required
            placeholder="EMAIL ADDRESS"
            name="email"
            class="mt-8 text-xs md:text-sm"
            value={formik.values.email}
            type="text"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}
          <Input
            onChange={(event) => {
              formik.handleChange(event);
              setError("");
            }}
            required
            placeholder="PASSWORD"
            name="password"
            class="mt-2 text-xs md:text-sm"
            value={formik.values.password}
            type="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}

          <p className="text-slate-500 text-[10px] md:text-sm mt-10">
            By signing in you accept the Terms and Conditions of example.com
          </p>
          <div className="text-center text-red-500 mb-5 tracking-wide font-semibold">
            {error}
          </div>
          {loading && (
            <>
              <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-[0.8] flex flex-col items-center justify-center">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                <h2 className="text-center text-white text-xl font-semibold">
                  Loading...
                </h2>
                <p className="w-1/3 text-center text-white">
                  This may take a few seconds, please don't close this page.
                </p>
              </div>
            </>
          )}
          <Button
            onClick={formik.handleSubmit}
            class="w-full"
            outline
            color="transparent"
          >
            LOG IN
          </Button>
          <p className="my-2 text-white">
            <p className="text-center mb-3">or</p>
            <GoogleOAuthProvider
              clientId={
                "635264642318-284aift53keao63nan68r055p302hmjv.apps.googleusercontent.com"
              }
            >
              <GoogleLoginButton
                setError={setError}
                loading={loading}
                setLoading={setLoading}
              />
            </GoogleOAuthProvider>
          </p>
          <p className="my-2 text-white">
            Not registered?{" "}
            <button
              className="text-blue-800"
              onClick={() => navigate("/signup")}
            >
              Signup now
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
