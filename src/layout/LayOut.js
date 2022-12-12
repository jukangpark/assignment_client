import { useEffect } from "react";
import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { globalLoggedInState } from "../atom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const LayOut = () => {
  const isLoggedIn = useRecoilValue(globalLoggedInState);
  //   useEffect(() => {}, []);
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayOut;
