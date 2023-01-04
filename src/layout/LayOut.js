import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "atom/auth";
import Footer from "components/Footer";
import Header from "components/Header";

const LayOut = () => {
  const data = useRecoilValue(currentUserInfoQuery);

  return (
    <div>
      <Header isLoggedIn={data?.result} id={data?.user?.id} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayOut;
