import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "atom/auth";
import Footer from "components/Footer";
import Header from "components/Header";
import { useSelector } from "react-redux";

const LayOut = () => {
  const data = useRecoilValue(currentUserInfoQuery);

  const reduxUserData = useSelector((state) => state.USER);

  console.log("useSelector 로 가져온 유젇 데이터", reduxUserData.result);

  return (
    <div>
      <Header isLoggedIn={data?.result} id={data?.user?.id} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayOut;
