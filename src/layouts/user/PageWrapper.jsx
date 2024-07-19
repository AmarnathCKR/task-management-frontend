/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { unsuscribeToken, unsuscribeUser } from "../../store";
import { useNavigate } from "react-router-dom";

function PageWrapper(props) {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(unsuscribeUser());
    localStorage.removeItem("token");
    dispatch(unsuscribeToken());

    navigate("/login");
  };
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-cyan-900 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            EXAMPLE.COM
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setActive(!active)}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`w-full ${
            active ? "block" : "hidden"
          } flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            <a
              onClick={()=>navigate("/")}
              className="block mt-4 cursor-pointer lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Home
            </a>
            <a
              onClick={()=>navigate("/profile")}
              className="block mt-4 cursor-pointer lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Profile
            </a>
            <a
              onClick={()=>navigate("/myfeed")}
              className="block mt-4 cursor-pointer lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            >
              My posts
            </a>
          </div>
          <div>
            <a
              onClick={handleLogout}
              className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
      {props.children}
    </>
  );
}

export default PageWrapper;
