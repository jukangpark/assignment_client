import StyledButton from "components/styled/form/StyledButton";
import StyledForm from "components/styled/form/StyledForm";
import StyledInput from "components/styled/form/StyledInput";
import StyledTitle from "components/styled/form/StyledTitle";
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

    fetch(`${process.env.REACT_APP_BASE_URL}/posts/test`, {
      method: "POST", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(post), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data?.message);
        window.location.replace("/");
      });
  };

  return (
    <div>
      <StyledTitle>Upload 페이지</StyledTitle>
      <StyledForm>
        <StyledInput
          placeholder="title"
          value={post.title}
          onChange={handleTitle}
        />
        <StyledInput
          placeholder="content"
          value={post.content}
          onChange={handleContent}
        />
        <StyledInput
          placeholder="password"
          value={post.password}
          onChange={handlePassword}
        />
        <StyledButton onClick={handleSubmit}>업로드</StyledButton>
      </StyledForm>
    </div>
  );
};

export default Upload;
