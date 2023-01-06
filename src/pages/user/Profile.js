import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StyledTitle from "components/styled/form/StyledTitle";
import StyledPost from "components/styled/post/StyledPost";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const token = JSON.parse(window.localStorage.getItem("token"));

// const getProfile = (file) => {
//   return new Promise((resolve) => {
//     let baseUrl = "";

//     let reader = new FileReader();

//     reader.readAsDataURL(file);

//     reader.onload = () => {
//       baseUrl = reader.result;
//       resolve(baseUrl);
//     };
//   });
// };

// javaScript 에서 Blob(Binary Large Object, 블랍) 은 이미지, 사운드, 비디오 같은 멀티미디어 데이터를 다룰 때 사용할 수 있습니다.
// File 객체도 name 과 lastModifiedDate 속성이 존재하는 Blob 객체입니다.

const Profile = () => {
  const [image, setImage] = useState("");
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

  const profileImageUpload = async (e) => {
    e.preventDefault();

    // axios.post(`${process.env.REACT_APP_BASE_URL}/user/${id}/test`, image);

    let formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/${id}/test`,
        formData
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // image 라는 state 에 Blob 객체를 담아서,
    // api 에 담아서 보내기
    // 이미지가 바뀔 때마다 바뀐 이미지를 미리보기로 보여주기
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
