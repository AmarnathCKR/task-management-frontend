/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CldPhoto from "../UI/CldPhoto";
import { Cloudinary } from "@cloudinary/url-gen";
import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { TECollapse, TERipple } from "tw-elements-react";
import NewPost from "./NewPost";
import { getAnyApi } from "../../api/api";

const cld = new Cloudinary({
  cloud: {
    cloud_name: "dqrpxoouq", //Your cloud name
    upload_preset: "n0d0jino", //Create an unsigned upload preset and update this
  },
});
function Post({ content , trigger }) {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const toggleShow = () => setShow(!show);
  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  
  const handDelete = ()=>{
    getAnyApi(`/user/delete-post?postId=${content._id}`,token).then((res)=>{
        trigger();
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    <div className="text-center w-full my-4 break-words bg-white rounded flex flex-col ">
        <NewPost active={active} trigger={()=>{setActive(!active);trigger()}} link={`user/edit-post?postId=${content._id}`} message="Edit Post" postData={content}/>
      <div className="flex my-3 border-b-2 border-black  justify-between">
        <p className="px-4">{format(content.createdAt)}</p>
        <p className="px-4">{content.userId.name}</p>
        {userData.id === content.userId._id && (
          <div>
            <p className="mx-4 cursor-pointer" onClick={toggleShow}>
              Options
            </p>
            <TECollapse className="absolute" show={show}>
              <div className="block rounded-lg border bg-white p-2 shadow-lg dark:bg-neutral-700 dark:text-neutral-50">
                <ul className="w-full">
                  <li onClick={()=>setActive(!active)} className="border px-3 py-1 cursor-pointer">Edit</li>
                  <li onClick={handDelete} className="text-red-700 border px-3 py-1 cursor-pointer">
                    Delete
                  </li>
                </ul>
              </div>
            </TECollapse>
          </div>
        )}
      </div>
      <p>{content.title}</p>
      <CldPhoto
        key={cld.cloudinaryConfig.cloud.upload_preset}
        publicId={content?.image}
        cloudName={cld.cloudinaryConfig.cloud.cloud_name}
      />
    </div>
  );
}

export default Post;
