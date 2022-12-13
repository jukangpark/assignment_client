import { atom, selector } from "recoil";

// console.log(token);

const token = window.localStorage.getItem("token");
let tokenData;

if (token) {
  tokenData = JSON.parse(token);
}
console.log(tokenData);

// token 값이 존재한다고 한다면?
// 해당 토큰 값을 가지고 user 의 Profile 정보를 가지고 올 수 있는 api 호출하기

export const globalLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

export const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: async () => {
    if (token) {
      try {
        const response = await fetch(
          "http://localhost:9000/user/profile/test",
          {
            headers: {
              Authorization: tokenData,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    return { result: false };
  },
});
