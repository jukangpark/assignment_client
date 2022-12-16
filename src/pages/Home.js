import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// npm i react-dotenv

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(process.env);
    const func = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/posts/test`
      );
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    try {
      func();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <h1>Home 페이지</h1>
      {posts.map((post, index) => (
        <div
          key={index}
          style={{ border: "1px solid gray", margin: "10px", display: "block" }}
        >
          <Link to={`/posts/${post._id}`}>
            <h1> 제목 : {post?.title}</h1>
            <p> 내용 : {post?.content}</p>
            <p> 작성일 : {post?.createdAt}</p>
          </Link>
          <Link to={`/user/${post?.author}`}>
            <p> author: {post?.author}</p>
          </Link>
        </div>
      ))}

      {/* <Child>
        <div>1</div>
      </Child> */}
    </div>
  );
};

export default Home;
