import styled from "styled-components";

const StyledPost = styled.div`
  margin: 10px;
  display: block;

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a > h1 {
    font-size: 24px;
  }
`;

export default StyledPost;
