import React, { useState } from "react";
import { postAnyAuth } from "../../../api/api";
import { useSelector } from "react-redux";
import Modal from "./Modal";

const AddColumnModal = ({ isOpen, onClose, onColumnAdded ,trigger}) => {
  const [newColumnName, setNewColumnName] = useState("");

  const token = useSelector((state) => state.token);

  const handleAddColumn = async () => {
    try {
      const { name } = { name: newColumnName };
      const column = await postAnyAuth("data/columns", { name }, token);
      onColumnAdded(column.data);
      setNewColumnName("");
      trigger()
      onClose();
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="add-column-container flex flex-col justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Column</h2>
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          placeholder="Column Name"
          className="w-full p-2 pl-10 text-sm text-gray-700"
        />
        <button
          onClick={handleAddColumn}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Column
        </button>
      </div>
    </Modal>
  );
};

export default AddColumnModal;