import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Update = () => {
  const { id } = useParams();
  console.log(id);
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch(`http://localhost:9000/posts/${id}/test`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  const handleTitle = (e) => {
    setPost({ ...post, title: e.target.value });
    console.log(e.target.value);
  };

  const handleContent = (e) => {
    setPost({ ...post, content: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    const password = window.prompt("password", "");
    e.preventDefault();
    // console.log(post);

    fetch(`http://localhost:9000/posts/${id}/test`, {
      method: "PUT", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ ...post, password }), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data?.message);
        window.location.replace("/");
      });
  };

  return (
    <div>
      <h1>Update 페이지</h1>
      <form>
        <input placeholder="title" value={post.title} onChange={handleTitle} />
        <input
          placeholder="content"
          value={post.content}
          onChange={handleContent}
        />

        <button onClick={handleSubmit}>업데이트</button>
      </form>
    </div>
  );
};

export default Update;
