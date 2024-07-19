/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Button from "../UI/Button";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { Cloudinary } from "@cloudinary/url-gen";

import { postAnyAuth } from "../../api/api";
import ImageUpload from "../UI/ImageUpload";
import Photo from "../UI/CldPhoto";
import { useSelector } from "react-redux";
const MySwal = Swal;

function NewPost({
  active,
  trigger,
  message = "Create Post",
  link = "user/create-post",
  postData = { title: "", image: "" },
}) {
  const [values, setValues] = useState(postData);
  const [error, setError] = useState(null);
  const cld = new Cloudinary({
    cloud: {
      cloud_name: "dqrpxoouq", //Your cloud name
      upload_preset: "n0d0jino", //Create an unsigned upload preset and update this
    },
  });
  const onImageUploadHandler = (publicId) => {
    setValues((state) => ({ ...state, image: publicId }));
  };
  console.log(values);
  const token = useSelector((state) => state.token);
  const handleSubmit = () => {
    postAnyAuth(link, { title: values.title, image: values.image }, token)
      .then((res) => {
        setValues(postData);
        setError(null);
        trigger();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="flex justify-center w-full mt-2">
      {message === "Create Post" && (
        <button
          onClick={trigger}
          className="border rounded p-2 bg-black text-white"
        >
          Create Post
        </button>
      )}
      {active && (
        <>
          <div className="z-[1] modal-local p-4">
            <div className="modal-local-content rounded">
              <div className="modal-local-header">
                <h4 className="modal-local-title text-center font-bold text-xl">
                  {message}
                </h4>
              </div>
              <div className="modal-local-body flex flex-col justify-center items-center align-middle text-center">
                <input
                  type="text"
                  className="p-2 border my-2"
                  value={values?.title}
                  onChange={(e) =>
                    setValues((state) => ({ ...state, title: e.target.value }))
                  }
                  name="title"
                  placeholder="Title"
                />
                {values?.image && (
                  <Photo
                    key={cld.cloudinaryConfig.cloud.upload_preset}
                    publicId={values?.image}
                    cloudName={cld.cloudinaryConfig.cloud.cloud_name}
                  />
                )}
                <ImageUpload
                  cloud_name={cld.cloudinaryConfig.cloud.cloud_name}
                  upload_preset={cld.cloudinaryConfig.cloud.upload_preset}
                  onImageUpload={(publicId) => onImageUploadHandler(publicId)}
                />
                <button
                  onClick={handleSubmit}
                  className="border my-3 rounded p-2 bg-black text-white"
                >
                  {message === "Create Post" ? "Create Post" : "Save Changes"}
                </button>
                {error && <p className="text-red-900">{error}</p>}
              </div>
              <div className="modal-local-footer">
                <button
                  onClick={() => {
                    setValues(postData);
                    setError(null);
                    trigger();
                  }}
                  className="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewPost;
