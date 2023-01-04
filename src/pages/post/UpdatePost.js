import StyledButton from "components/styled/form/StyledButton";
import StyledForm from "components/styled/form/StyledForm";
import StyledInput from "components/styled/form/StyledInput";
import StyledTitle from "components/styled/form/StyledTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = JSON.parse(window.localStorage.getItem("token"));
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}/test`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, []);

  const handleTitle = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const handleContent = (e) => {
    setPost({ ...post, content: e.target.value });
  };

  const handleSubmit = (e) => {
    const password = window.prompt("password", "");
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}/test`, {
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
        navigate("/");
      });
  };

  return (
    <div>
      <StyledTitle>Update 페이지</StyledTitle>
      <StyledForm>
        <h1>Title</h1>
        <StyledInput
          placeholder="title"
          value={post.title}
          onChange={handleTitle}
        />
        <h1>Content</h1>
        <textarea
          style={{ display: "block", width: "99%", height: "400px" }}
          placeholder="content"
          value={post.content}
          onChange={handleContent}
        />

        <StyledButton onClick={handleSubmit}>업데이트</StyledButton>
      </StyledForm>
    </div>
  );
};

export default Update;
