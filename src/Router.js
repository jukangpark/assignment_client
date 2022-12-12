import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "./layout/LayOut";
import Home from "./pages/Home";
import Join from "./pages/Join";
import LogIn from "./pages/Login";
import Upload from "./pages/Upload";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayOut />}>
          <Route path={"/"} element={<Home />} />
          <Route path={"/upload"} element={<Upload />} />
          <Route path={"/user/join"} element={<Join />} />
          <Route path={"/user/login"} element={<LogIn />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
