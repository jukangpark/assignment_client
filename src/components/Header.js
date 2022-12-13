import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  ul {
    display: flex;
    justify-content: space-around;
  }

  ul > li {
    list-style: none;
    text-align: center;
    cursor: pointer;
    line-height: 50px;
  }
`;

const handleLogOut = () => {
  localStorage.removeItem("token");
  window.location.replace("/");
};

const Header = ({ isLoggedIn, id }) => {
  console.log(id);
  return (
    <StyledHeader>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/user/profile">{id} 님의 Profile</Link>
            </li>
            <li onClick={handleLogOut}>LogOut</li>
          </>
        ) : (
          <>
            <li>
              <Link to="/user/join">Join</Link>
            </li>
            <li>
              <Link to="/user/login">LogIn</Link>
            </li>
          </>
        )}
      </ul>
    </StyledHeader>
  );
};

export default Header;
