import axios from "axios";

// 회원 가입 API
const join = async ({ user }) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/join/test`,
    user
  );

  console.log(response);
};

export default join;

// react-query 에서 단순한 조회, get 요청을 보내기 위해서는 useQuery 를 사용한다.
// 반면, 데이터의 수정이 일어나는 Post, Delete, Patch(Put) 요청을 위해서는 useMutation을 사용해야 한다.

// 리턴되는 mutate 함수를 실행함으로써 서버에 요청을 보낼 수 있다.

// axios 사용하기

// const join = async ({ user }) => {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/user/join/test`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//       }
//     );

//     return response.json();
//   };

//   export default join;
