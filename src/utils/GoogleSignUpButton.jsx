import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import { CircleSpinner } from "react-spinners-kit";
import { useNavigate } from "react-router-dom";
import { PostAnyApi } from "../api/api";

function GoogleSignUpButton(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = () => {
    toast.success("Registration Sussesfull");
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(true);
          let data = {
            name: res.data.name,
            email: res.data.email,
            image: res.data.picture,
            google: true,
          };

          PostAnyApi("user/signup", data)
            .then((res) => {
              showToast();
              navigate("/login");
            })
            .catch((err) =>
              props.setError(err.response.data.data.errors[0].message)
            )
            .finally(() => console.log("success"));
        })

        .catch((err) => {
          props.setError(err);
          setLoading(false);
        });
    },

    onError: (error) => props.setError("Login Failed:" + error),
  });

  return (
    <div>
      <ToastContainer />
      <h1 className="text-warning text-lg text-center">{error}</h1>

      {loading ? (
        <div className="z-[999]  p-64 loader-local ">
          <CircleSpinner size={40} color="#000000" loading={loading} />
        </div>
      ) : (
        <button className="border-2 py-2 px-2 rounded" onClick={() => login()}>
          Sign up with Google 🚀
        </button>
      )}
    </div>
  );
}
export default GoogleSignUpButton;
