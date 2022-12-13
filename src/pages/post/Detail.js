import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "../../atom";

const Detail = () => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const data = useRecoilValue(currentUserInfoQuery);

  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const { id } = useParams();
  //   console.log(id);
  useEffect(() => {
    try {
      fetch(`http://localhost:9000/posts/${id}/test`)
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
    console.log(password);
    try {
      fetch(`http://localhost:9000/posts/${id}/delete/test`, {
        method: "POST", // *GET, POST, PUT, DELETE 등
        // delete 메서드는 body 를 받지 않는다.
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password: password }), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data?.message);
          window.location.replace("/");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{ height: "300px" }}>
        <h1>디테일 페이지</h1>
        <p>{post?.title}</p>
        <p>{post?.content}</p>
      </div>
      <div>
        {data.result ? (
          <>
            <button onClick={handleUpdate}>update</button>
            <button onClick={handleDelete}>delete</button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Detail;
