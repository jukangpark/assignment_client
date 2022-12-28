// import { useState } from "react";
import { useNavigate } from "react-router";

// const Join = () => {
// const navigate = useNavigate();
//   // const [user, setUser] = useState({ id: "", password: "", password2: "" });

//   const handleId = (e) => {
//     setUser({ ...user, id: e.target.value });
//     console.log(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setUser({ ...user, password: e.target.value });
//     console.log(e.target.value);
//   };

//   const handlePassword2 = (e) => {
//     setUser({ ...user, password2: e.target.value });
//     console.log(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(user);
//     setUser({ id: "", password: "", password2: "" });

//     fetch(`${process.env.REACT_APP_BASE_URL}/user/join/test`, {
//       method: "POST", // *GET, POST, PUT, DELETE 등
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data?.message);
//         navigate("/user/login");
//       });
//   };

//   return (
//     <div>
//       <h1>Join 페이지</h1>
//       <form>
//         <input placeholder="id" value={user.id} onChange={handleId} />
//         <input
//           placeholder="password"
//           value={user.password}
//           type="password"
//           onChange={handlePassword}
//           autoComplete={"off"}
//         />
//         <input
//           placeholder="password 확인"
//           value={user.password2}
//           type="password"
//           onChange={handlePassword2}
//           autoComplete={"off"}
//         />
//         <button onClick={handleSubmit}>업로드</button>
//       </form>
//     </div>
//   );
// };

// export default Join;

import { useForm } from "react-hook-form";

const Join = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onValid = ({ id, password, password2 }) => {
    if (password !== password2) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    setValue("id", "");
    setValue("password", "");
    setValue("password2", "");
    console.log(id, password, password2);
    fetch(`${process.env.REACT_APP_BASE_URL}/user/join/test`, {
      method: "POST", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data?.message);
        navigate("/user/login");
      });
  };

  return (
    <div>
      <h1>Join 페이지</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("id", {
            required: "id를 입력해주세요",
            maxLength: 20,
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바른 이메일을 입력해주세요",
            },
          })}
          type="id"
        />
        <span>{errors?.id?.message}</span>
        <input
          {...register("password", { required: "비밀번호를 입력해주세요" })}
          type="password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password2", { required: "비밀번호를 입력해주세요" })}
          type="password"
        />
        <span>{errors?.password2?.message}</span>
        <button onClick={handleSubmit(onValid)}>회원가입</button>
      </form>
    </div>
  );
};
export default Join;
