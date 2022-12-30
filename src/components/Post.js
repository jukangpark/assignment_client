import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPost = styled.div`
  border: 1px solid gray;
  margin: 10px;
  display: block;

  a > h1 {
    font-size: 24px;
  }
`;

const Post = ({ post }) => {
  return (
    <StyledPost>
      <Link to={`/posts/${post._id}`}>
        <h1> 제목 : {post?.title}</h1>
        <p> 내용 : {post?.content}</p>
        <p> 작성일 : {post?.createdAt}</p>
      </Link>
      <Link to={`/user/${post?.author}`}>
        <p> author: {post?.author}</p>
      </Link>
    </StyledPost>
  );
};

export default Post;
