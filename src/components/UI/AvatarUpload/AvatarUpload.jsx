import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AvatarUpload.css";

const AvatarUpload = ({
  defaultImageUrl = "http://i.pravatar.cc/500?img=7",
  onImageChange,
  accept = ".png, .jpg, .jpeg",
  className = "",
  defaultImg,
  ImageUpload
}) => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  useEffect(()=>{
    setImageUrl(defaultImg)
  },[defaultImg])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        if (onImageChange) {
          onImageChange(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`avatar-upload ${className}`}>
      <div className="avatar-edit">
        {ImageUpload}
        <label htmlFor="imageUpload"></label>
      </div>
      <div className="avatar-preview">
        <div
          id="imagePreview"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>
    </div>
  );
};

AvatarUpload.propTypes = {
  defaultImageUrl: PropTypes.string,
  onImageChange: PropTypes.func,
  accept: PropTypes.string,
  className: PropTypes.string,
};

export default AvatarUpload;
