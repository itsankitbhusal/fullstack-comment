import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { apiUrl } from "../constants/index.jsx";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const Modal = ({
  modalOpen,
  handleSubmit,
  setModalOpen,
  selectedComment,
  setSelectedComment,
}) => {
  return (
    <>
      <div className="w-full flex justify-center" onClick={() => setModalOpen(true)}>
        <button className=" hover:cursor-pointer bg-blue-600 text-white rounded-md p-2 px-5">Add new comment</button>
      </div>
      {modalOpen && (
        <div className=" absolute w-screen h-screen grid inset-0 bg-black bg-opacity-30 backdrop-blur-sm justify-center items-center">
          <div>
            <div className=" flex justify-between items-center">
              <h3 className=" font-bold">Add new comment</h3>
              <RxCross2
                className=" hover:cursor-pointer"
                onClick={() => {
                  setModalOpen(false);
                  setSelectedComment(null);
                }}
              />
            </div>
            <form onSubmit={handleSubmit} className=" flex flex-col">
              <input
                className=" mb-2 border border-gray-600 rounded p-4 py-2"
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={selectedComment?.title}
              />
              <textarea
                className=" mb-2 border border-gray-600 rounded p-4 py-2"
                name="content"
                cols="30"
                rows="4"
                placeholder="Content"
                defaultValue={selectedComment?.content}
              ></textarea>
              <button
                type="submit"
                className=" bg-blue-500 text-white rounded-md p-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
