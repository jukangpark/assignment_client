import { faMonero } from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun, faUser } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isDark } from "atom/theme";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
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

  ul > li > a {
    text-decoration: none;
  }

  ul > li:hover {
    text-decoration: underline;
  }
`;

const handleLogOut = () => {
  localStorage.removeItem("token");
  window.location.replace("/");
};

const Header = ({ isLoggedIn, id }) => {
  const [isDarkState, setIsDarkState] = useRecoilState(isDark);

  const handleTheme = () => {
    const isDarkJson = JSON.parse(localStorage.getItem("isDark"));
    if (isDarkJson === null) {
      localStorage.setItem("isDark", JSON.stringify(true));
    }
    localStorage.setItem("isDark", !isDarkJson);
    setIsDarkState(!isDarkState);
  };

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
              <Link to={`/user/${id}`}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
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
        <li onClick={handleTheme} style={{ cursor: "pointer" }}>
          <FontAwesomeIcon icon={isDarkState ? faSun : faMoon} />
        </li>
      </ul>
    </StyledHeader>
  );
};

export default Header;
