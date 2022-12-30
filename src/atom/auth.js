import { atom, selector } from "recoil";

// console.log(token);

const token = window.localStorage.getItem("token");
let tokenData;

if (token) {
  tokenData = JSON.parse(token);
}
// console.log("내가 서버로 부터 받은 토큰 데이터", tokenData);

// token 값이 존재한다고 한다면?
// 해당 토큰 값을 가지고 user 의 Profile 정보를 가지고 올 수 있는 api 호출하기

export const globalLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});

// localStorage 에 "token" 이라는 키값으로 만약 token 이 존재한다고 한다면
// api 통신을 해서 해당 token 이 유효한지 판단하고, 로그인이 되었는지를 판별한다.
// 이 작업은 layOut 이 렌더링 될 때 한번 처리됨.
// 그리고 만약 localStorage 에 "token" 이라는 키값이 존재 하지 않는다면,
// 굳이 서버와 통신할 필요가 없음. 이미 로그아웃 된 유저라는 의미,
// 따라서 전역으로 관리되는 currentUserInfoQuery 라는 state 의 default 값으로
// {result: false} 를 넣어주삼

export const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: async () => {
    if (token) {
      // console.log(
      //   "로컬 스토리지에 token이 존재한다면 이 함수(서버에 인증 절차)를 무조건 실행할거임"
      // );
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/user/myProfile/test`,
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
