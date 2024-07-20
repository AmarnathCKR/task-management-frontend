import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;