import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      {
        posts?.length > 1 ? <h1>Other posts you may like</h1> : null
      }
      {
        posts?.length > 1 ? <>
          {posts?.map((post) => (
            <div className="post" key={post.id}>
              <img src={`http://localhost:8800/uploads/${post?.img}`} />
              <h2>{post?.title}</h2>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>

            </div>
          ))}
        </> : null
      }

    </div>
  );
};

export default Menu;
