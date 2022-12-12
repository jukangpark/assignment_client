import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { globalLoggedInState } from "../atom";

const Home = () => {
  const isLoggedIn = useRecoilValue(globalLoggedInState);
  useEffect(() => {
    fetch("http://localhost:9000/test")
      .then((res) => res.json())
      .then((data) => console.log(data));

    fetch("http://localhost:9000/posts/minsu")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h1>Home 페이지</h1>
    </div>
  );
};

export default Home;
