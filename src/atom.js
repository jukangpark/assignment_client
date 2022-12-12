import { atom } from "recoil";

console.log(JSON.parse(localStorage.getItem("token")));

// token 값이 존재한다고 한다면?
// 해당 토큰 값을 가지고 user 의 Profile 정보를 가지고 올 수 있는 api 호출하기

export const globalLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});
