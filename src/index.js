import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools

// queryClientProvider 에는 하나의 컴포넌트만 들어가야해요

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
