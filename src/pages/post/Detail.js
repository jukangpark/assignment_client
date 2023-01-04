import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledTitle from "components/styled/form/StyledTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

/*
  요즘은 i 태그 대신에 SVG 기반인 <svg/> 태그를 사용한 아이콘이 기능이나 성능적인 측면에서 유리한 점이 많다.
  npm i @fortawesome/fontawesome-svg-core
  npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
  Font Awesome 을 React 컴포넌트 형태로 사용할 수 있도록 해주는 거
  npm i @fortawesome/react-fontawesome
*/

const Detail = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}/test`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdate = () => {
    navigate(`/posts/${id}/update`);
  };

  const handleDelete = () => {
    const password = window.prompt("게시물 비밀번호를 입력해주세요", "");
    try {
      fetch(`${process.env.REACT_APP_BASE_URL}/posts/${id}/delete/test`, {
        method: "POST", // *GET, POST, PUT, DELETE 등
        // delete 메서드는 body 를 받지 않는다.
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password }), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data?.message);
          if (data?.result) {
            window.location.replace("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <StyledTitle>{post?.title}</StyledTitle>
      <p>작성자 : {post?.author}</p>
      <p>내용 : {post?.content}</p>
      <p>날짜 : {post?.createdAt}</p>
      <div>
        <button onClick={handleUpdate}>update</button>
        <button onClick={handleDelete}>delete</button>
        <button>
          Like
          <FontAwesomeIcon
            icon={faThumbsUp}
            size="1x"
            style={{ cursor: "pointer" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Detail;
