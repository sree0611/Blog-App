import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";

const Write = () => {
  const state = useLocation().state;

  const navigate = useNavigate()

  console.log(state, "gfh");

  const { currentUser } = useContext(AuthContext);
  const hasShownToast = useRef(false);

  console.log(currentUser, "current");

  useEffect(() => {
    if (currentUser === null && !hasShownToast.current) {
      navigate("/Register");
      toast.info("Only registered users can write blogs. Please sign in or sign up to contribute!");
      hasShownToast.current = true;
    }
  }, [currentUser, navigate]);



  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");



  // const upload = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const res = await axios.post("/upload", formData);
  //     console.log(res, "response");
  //     return res.data;
  //   } catch (err) {
  //     console.log(err, "erorr");
  //   }
  // };

  const upload = async () => {
    try {
      if (!file) throw new Error("No file selected");
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      if (!res.data) throw new Error("No file URL in response");
      console.log(res.data, "Uploaded image URL");
      return res.data
    } catch (err) {
      console.error(err, "Image upload failed");
      toast.error("Image upload failed");
      throw err; // Rethrow the error so it can be caught in handleClick
    }
  };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   // navigate("/")

  //   if (!title || !value || !file || !cat) {
  //     toast.info("Please fill all the fields to submit the post");
  //     return;
  //   }


  //   const imgUrl = await upload();

  //   try {
  //     state
  //       ? await axios.put(`/posts/${state.id}`, {
  //         title,
  //         desc: value,
  //         cat,
  //         img: file ? imgUrl : "",
  //       }).then((res) => {
  //         toast.success("Updated Successfully")
  //       }).catch((err) => {

  //       })
  //       : await axios.post(`/posts/`, {
  //         title,
  //         desc: value,
  //         cat,
  //         img: file ? imgUrl : "",
  //         date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //       }).then((res) => {
  //         toast.success("Submitted Successfully")
  //       }).catch((error) => {

  //       })

  //     navigate("/")
  //   } catch (err) {
  //     console.log(err, "error");
  //     toast.warning("Please sign-up to add posts")
  //   }
  // };

  // const handleClick = async (e) => {
  //   e.preventDefault();

  //   if (!title || !value || !file || !cat) {
  //     toast.info("Please fill all the fields to submit the post");
  //     return;
  //   }


  //   // const imgUrl = await upload();


  //   // axios.post(`/posts/`, {
  //   //   title,
  //   //   desc: value,
  //   //   cat,
  //   //   img: file ? "" : "",
  //   //   date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //   // })
  //   //   .then(response => {
  //   //     // let imgUrl = "";
  //   //     // const imgUrl = upload();
  //   //     // handle success
  //   //     console.log(response);
  //   //     toast.success("Post has been created");
  //   //     navigate("/");
  //   //   })
  //   //   .catch(error => {
  //   //     // handle error
  //   //     console.error(error);
  //   //   });

  //   try {
  //     if (state) {
  //       await axios.put(`/posts/${state.id}`, {
  //         title,
  //         desc: value,
  //         cat,
  //         img: file ? '' : "",
  //       });
  //       toast.success("Updated Successfully");
  //     } else {
  //       await axios.post(`/posts/`, {
  //         title,
  //         desc: value,
  //         cat,
  //         img: file ? '' : "",
  //         date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  //       });
  //       toast.success("Submitted Successfully");
  //     }

  //     navigate("/");
  //   } catch (err) {
  //     console.log(err, "error");
  //     toast.warning("Please sign-up to add posts");
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!title || !value || !file || !cat) {
      toast.info("Please fill all the fields to submit the post");
      return;
    }

    try {
      const imgUrl = await upload();

      const postData = {
        title,
        desc: value,
        cat,
        img: file ? imgUrl?.fileUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log(postData, "postdata");

      if (state) {
        await axios.put(`/posts/${state.id}`, postData);
        toast.success("Updated Successfully");
      } else {
        await axios.post(`/posts/`, postData);
        toast.success("Submitted Successfully");
      }

      navigate("/");
    } catch (err) {
      console.error(err, "Post submission failed");
      toast.error("An error occurred while submitting the post. Please try again.");
    }
  };




  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          {/* <span>
            <b>Status: </b> Draft
          </span> */}
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            // style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            {/* <button>Save as a draft</button> */}
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "travel"}
              name="cat"
              value="travel"
              id="travel"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="travel">Travel</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
