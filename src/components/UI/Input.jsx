import React, { useState } from "react";
import classNames from "classnames";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";



function Input({
  onChange,
  required,
  placeholder,
  type,
  value,
  name,
  ...rest
}) {
  const classes = classNames(
    "border-0 border-b md:border-b-2 border-white box-border p-[16px] block w-full bg-transparent bg-opacity-70 text-white tracking-wide",
    rest.className
  );
  const [seePassword, setSeePassword] = useState(false);
  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  if (type === "password") {
    return (
      <div className="w-full relative">
        <input
          type={seePassword ? "text" : "password"}
          className={classes}
          required={required}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          value={value}
          name={name}
        />
        {seePassword ? (
          <BsEyeFill
            onClick={handleSeePassword}
            className="cursor-pointer absolute top-6 right-3 text-white"
          />
        ) : (
          <BsEyeSlashFill
            onClick={handleSeePassword}
            className="cursor-pointer absolute top-6 right-3 text-white"
          />
        )}
      </div>
    );
  }
  return (
    <input
      type={type}
      className={classes}
      required={required}
      onChange={(e) => onChange(e)}
      placeholder={placeholder}
      value={value}
      name={name}
    />
  );
}

export default Input;
