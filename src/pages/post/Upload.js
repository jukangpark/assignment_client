import { useState } from "react";

const Upload = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [post, setPost] = useState({ title: "", content: "", password: "" });

  const handleTitle = (e) => {
    setPost({ ...post, title: e.target.value });
    console.log(e.target.value);
  };

  const handleContent = (e) => {
    setPost({ ...post, content: e.target.value });
    console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setPost({ ...post, password: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(post);
    setPost({ title: "", content: "", password: "" });

    fetch("http://localhost:9000/posts/test", {
      method: "POST", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(post), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message));
    window.location.replace("/");
  };

  return (
    <div>
      <h1>Upload 페이지</h1>
      <form>
        <input placeholder="title" value={post.title} onChange={handleTitle} />
        <input
          placeholder="content"
          value={post.content}
          onChange={handleContent}
        />
        <input
          placeholder="password"
          value={post.password}
          onChange={handlePassword}
        />
        <button onClick={handleSubmit}>업로드</button>
      </form>
    </div>
  );
};

export default Upload;
