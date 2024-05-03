import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../constants";
const Home = () => {
  const [comments, setComments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedComment, setSelectedComment] = useState(null);

  // fetch comments from api
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/comments`);
      setComments(response.data);
      setFetching(false);
    } catch (error) {
      toast.error(error.message);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);
  const deleteComment = async (commentId) => {
    // delete from api
    try {
      const response = await axios.delete(`${apiUrl}/comments/${commentId}`);
      if (response?.data) {
        setComments(comments.filter((comment) => comment.id !== commentId));
        toast.success("Comment deleted successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updateId = selectedComment?.id || 0;

    const payload = {
      title: formData.get("title"),
      content: formData.get("content"),
    };

    if (!payload.title || !payload.content) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      if (updateId === 0) {
        const response = await axios.post(`${apiUrl}/comments`, payload);
        const data = await response.data;
        if (data) {
          toast.success("Comment added successfully");
          setComments([...comments, data]);
          event.target.reset();
          setModalOpen(false);
        }
      } else if (updateId > 0) {
        const response = await axios.put(
          `${apiUrl}/comments/${updateId}`,
          payload
        );
        const data = await response.data;
        if (data) {
          toast.success("Comment updated successfully");
          const newComments = comments.map((comment) => {
            if (comment.id === updateId) {
              return data;
            }
            return comment;
          });
          setComments(newComments);
          setSelectedComment({ ...data, id: updateId });
          event.target.reset();
          setModalOpen(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setFetching(false);
    }
  };

  return (
    <div className=" grid text-gray-700 place-items-center">
      <div className=" mt-8">
        <h1 className=" text-2xl font-bold">Comments</h1>
        <div className=" mt-4">
          {!fetching &&
            comments.length > 0 &&
            comments?.map((comment) => (
              <div key={comment.id}>
                <h3 className=" font-bold">{comment.title}</h3>
                <div className=" mb-4 flex justify-between">
                  <p>{comment.content}</p>
                  <div className=" flex justify-between gap-4 ml-4">
                    <button
                      onClick={() => {
                        setModalOpen(true);
                        setSelectedComment(comment);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => {
                        const confirm = window.confirm(
                          "Are you sure you want to delete this comment?"
                        );
                        console.log(confirm);
                        if (confirm) {
                          deleteComment(comment.id);
                        }
                      }}
                      className=" text-red-500 "
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          <Modal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            handleSubmit={handleSubmit}
            selectedComment={selectedComment}
            setSelectedComment={setSelectedComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
