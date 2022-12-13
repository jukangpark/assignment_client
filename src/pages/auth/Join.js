import { useState } from "react";

const Join = () => {
  const [user, setUser] = useState({ id: "", password: "", password2: "" });

  const handleId = (e) => {
    setUser({ ...user, id: e.target.value });
    console.log(e.target.value);
  };

  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value });
    console.log(e.target.value);
  };

  const handlePassword2 = (e) => {
    setUser({ ...user, password2: e.target.value });
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setUser({ id: "", password: "", password2: "" });

    fetch("http://localhost:9000/user/join/test", {
      method: "POST", // *GET, POST, PUT, DELETE 등
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    })
      .then((res) => res.json())
      .then((data) => alert(data?.message));
  };

  return (
    <div>
      <h1>Join 페이지</h1>
      <form>
        <input placeholder="id" value={user.id} onChange={handleId} />
        <input
          placeholder="password"
          value={user.password}
          type="password"
          onChange={handlePassword}
          autoComplete={"off"}
        />
        <input
          placeholder="password 확인"
          value={user.password2}
          type="password"
          onChange={handlePassword2}
          autoComplete={"off"}
        />
        <button onClick={handleSubmit}>업로드</button>
      </form>
    </div>
  );
};

export default Join;
