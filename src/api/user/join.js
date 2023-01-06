import axios from "axios";

// 회원 가입 API
const join = async (user) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/join/test`,
    user
  );

  alert(data?.message);
  window.location.replace("/user/login");
  return data;
};

export default join;

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
