import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const Single = () => {
  const [post, setPost] = useState({});

  console.log(post, "post");

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  console.log(postId, "psot id");

  const { currentUser } = useContext(AuthContext);

  console.log(currentUser, "current");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("api calling");
        const res = await axios.get(`/posts/${postId}`);
        setPost(res?.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/")
      toast.success("Deleted Successfully")
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }



  return (
    <div className="single">
      <div className="content">
        <img src={`http://localhost:8800/uploads/${post?.img}`} alt="banner" />
        <div className="user">
          {post?.userImg && <img
            src={`http://localhost:8800/uploads/${post?.userImg}`}
            alt="user"
          />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>      </div>
      <Menu cat={post?.cat} />
    </div>
  );
};

export default Single;
