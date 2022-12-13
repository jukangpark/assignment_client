import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserInfoQuery } from "./atom";
import LayOut from "./layout/LayOut";
import Detail from "./pages/post/Detail";
import Home from "./pages/Home";
import Join from "./pages/auth/Join";
import LogIn from "./pages/auth/Login";
import NotFound404 from "./pages/NotFound404";
import Profile from "./pages/user/Profile";
import UpdatePost from "./pages/post/UpdatePost";
import Upload from "./pages/post/Upload";

const Router = () => {
  const { result: isLoggedIn } = useRecoilValue(currentUserInfoQuery);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/posts/:id"} element={<Detail />} />
          {isLoggedIn ? (
            <>
              <Route path={"/upload"} element={<Upload />} />
              <Route path={"/user/profile"} element={<Profile />} />
              <Route path={"/posts/:id/update"} element={<UpdatePost />} />
            </>
          ) : (
            <>
              <Route path={"/user/join"} element={<Join />} />
              <Route path={"/user/login"} element={<LogIn />} />
            </>
          )}
          <Route path="/*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
