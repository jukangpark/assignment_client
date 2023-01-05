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

// 컴포넌트가 마운트 되기 전에 상태를 불러오면 에러가 발생한다.
// 보통의 경우 우리는 마운트가 완료된 이후에 데이터를 호출하기 위해
// useEffect(() => {},[]) 안에 호출 메서드를 넣어준다.
// 하지만 ** 중요 ) useRecoilValue 는 react hook 이기 때문에 useEffect 안에서 호출할 수 없다.

// 공식 홈페이지에서는 fending 중인 데이터를 다루기 위해 React Suspense 와 함께 동작하도록 디자인 되어 있다고 정의되어있다.

// Router 를 Suspense 로 감싸주는 이유 ->
// useRecoilValue 를 사용하면 컴포넌트가 마운트 되기 이전에 비동기로 받아온 데이터로 state 를 처리하게 되는데,
// 이때 warning 이 발생함.
