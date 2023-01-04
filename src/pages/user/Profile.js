import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledTitle from "components/styled/form/StyledTitle";
import StyledPost from "components/styled/post/StyledPost";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const token = JSON.parse(window.localStorage.getItem("token"));

// 이미지 파일을 인자로 받아서 url 로 뱉는 함수(?)
const getProfile = (file) => {
  return new Promise((resolve) => {
    let baseUrl = "";

    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      baseUrl = reader.result;
      resolve(baseUrl);
    };
  });
};

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState({ isLoading: true });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/${id}/test`)
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...data, isLoading: false });
      });
  }, [id]);

  const handleFollow = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/${id}/follow/test`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message));
  };

  const inputRef = useRef(null);

  const profileImageUpload = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div>
      {user.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <StyledTitle>{user.id} 님의 프로필 페이지</StyledTitle>
          <form>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <input
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={handleImageChange}
            />
            <button onClick={profileImageUpload}>프로필 사진 업로드</button>
          </form>
          <button onClick={handleFollow}>팔로우하기</button>

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <h3>팔로잉 : {user.following}</h3>
            <h3>팔로워 : {user.follower}</h3>
            <h3> 게시글 수 : {user.posts.length} </h3>
          </div>

          <ul>
            <h3>게시글 목록</h3>
            {user.posts.map((post, index) => (
              <StyledPost key={index}>
                <li>
                  <Link to={`/posts/${post._id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                </li>
              </StyledPost>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Profile;
