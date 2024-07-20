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
import ColoumnContainer from "../../components/Tasks/TaskBoard";

function Home() {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(unsuscribeUser());
    localStorage.removeItem("token");
    dispatch(unsuscribeToken());

    navigate("/login");
  };

  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  useEffect(() => {

    if (!userData) {


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
      <ColoumnContainer />
    </PageWrapper>
  );
}

export default Home;
