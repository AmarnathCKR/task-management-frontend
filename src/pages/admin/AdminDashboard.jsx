import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  subscribeAllData,
  unsuscribeAdminToken,
  unsuscribeAllData,
} from "../../store/index";
import axios from "axios";
import EditUser from "../../components/admin/EditUser";
import AddUser from "../../components/admin/AddUser";
import { getAnyApi } from "../../api/api";
function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [create, setCreate] = useState(false);
  const [userData, setUserData] = useState(null);
const token = useSelector((state)=>state.adminToken);

  const handleDelete = async (key,arg) => {
    
    window.confirm("Are you sure");
    getAnyApi(`admin/block-user?userId=${key}&arg=${arg}`,token)
    .then((res)=>{
      setUserData(res.data.allUser);
    })
    .catch((err)=>{
      console.log(err);
    })
  };
  useEffect(() => {
    getAnyApi("admin/all",token)
      .then((res) => {
        setUserData(res.data.allUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let items;
  const mappedItems = userData?.map((data) => {
    items = {
      id: data._id,
      name: data.name,
      email: data.email,
      image: data.image,
    };
    return (
      <tr key={data._id}>
        <td>{data.name}</td>

        <td>{data.email}</td>
        
        <td>
          <button
            onClick={() => {
              handleDelete(data._id,data.status ? false : true);
            }}
            className="btn btn-dark"
          >
            {data.status ? "Block" : "Unblock"}
          </button>
        </td>
      </tr>
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("all-user");
    dispatch(unsuscribeAdminToken());
    localStorage.removeItem("admin-token");
    dispatch(unsuscribeAllData());
    navigate("/admin-login");
  };
  const changeStat = () => {
    setCreate(false);
  };
  
  return (
    <div className="bg-black text-center text-white">
      <p className="h1 py-3">Admin Dashboard</p>
      <div className="flex justify-center w-full">
        
        
        <button
          onClick={handleLogout}
          className="btn border bg-red-900 text-black p-2 rounded mx-2 my-2"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center bg-black">
        <table className="table border w-full table-bordered my-5">
          <thead>
            <th className="border">Name</th>

            <th className="border">E-mail</th>
            <th className="border">Block</th>
          </thead>
          <tbody>{mappedItems}</tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
