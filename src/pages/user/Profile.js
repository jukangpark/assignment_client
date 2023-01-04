import StyledPost from "components/styled/post/StyledPost";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const token = JSON.parse(window.localStorage.getItem("token"));

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState({ isLoading: true });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user/${id}/test`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({ ...data, isLoading: false });
      });
  }, [id]);

  // 1. 이 페이지를 통해 현재 로그인 된 유저의 프로필
  // 2. 현재 로그인된 페이지가 아닌, 다른 사람들의 프로필 둘다 볼 수 있게끔?

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

  console.log(user.posts);

  return (
    <div>
      {user.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1>{user.id} 님의 프로필 페이지</h1>
          <div>프로필 이미지 영역</div>
          <button onClick={handleFollow}>팔로우하기</button>
          {/* <button>팔로우하기</button> */}
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
