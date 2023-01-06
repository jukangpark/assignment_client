import axios from "axios";

// 로그인 API
const logIn = async (user) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/login/test`,
    user
  );

  if (data?.result) {
    localStorage.setItem("token", JSON.stringify(data?.token));
    window.location.replace("/");
  }
  alert(data.message);

  return data;
};

export default logIn;

// react-query 에서 단순한 조회, get 요청을 보내기 위해서는 useQuery 를 사용한다.
// 반면, 데이터의 수정이 일어나는 Post, Delete, Patch(Put) 요청을 위해서는 useMutation을 사용해야 한다.
