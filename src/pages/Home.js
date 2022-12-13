import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:9000/posts/test")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPosts(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <h1>Home 페이지</h1>
      {posts.map((post, index) => (
        <Link
          to={`/posts/${post._id}`}
          key={index}
          style={{ border: "1px solid gray", margin: "10px", display: "block" }}
        >
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
          <p> author: {post?.author?.id}</p>
          <p> createdAt: {post?.createdAt}</p>
        </Link>
      ))}

      {/* <Child>
        <div>1</div>
      </Child> */}
    </div>
  );
};

export default Home;
