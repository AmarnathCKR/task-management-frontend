import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  subscribeToken,
  subscribeUser,
  unsuscribeToken,
  unsuscribeUser,
} from "../../store/index";
import PageWrapper from "../../layouts/user/PageWrapper";
import { useEffect, useState } from "react";
import { getAnyApi } from "../../api/api";
import NewPost from "../../components/user/NewPost";
import AllPost from "../../components/user/AllPost";

function Home() {
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

  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  useEffect(() => {
    console.log(token);
    if (!userData) {
      console.log("visited");

      getAnyApi("/user/fetch-user", token)
        .then((res) => {
          dispatch(subscribeUser(res.data.user));
        })
        .catch((err) => {
          console.log(err);
          handleLogout();
        });
    }
  }, [active]);

  return (
    <PageWrapper>
      <div className="flex justify-center">
        <div className="flex flex-col md:w-5/12 w-full justify-center">
          <NewPost active={active} trigger={() => {setActive(!active);}} />
          <div className="bg-white mb-2 mt-4 p-3 w-full text-center text-2xl rounded">Recent Posts</div>
          <AllPost active={active}/>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Home;
