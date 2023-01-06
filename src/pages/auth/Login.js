import logIn from "api/user/logIn";
import StyledButton from "components/styled/form/StyledButton";
import StyledForm from "components/styled/form/StyledForm";
import StyledInput from "components/styled/form/StyledInput";
import StyledTitle from "components/styled/form/StyledTitle";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

const LogIn = () => {
  const { data, mutate, isLoading, isError, error, isSuccess } =
    useMutation(logIn);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onValid = ({ id, password }) => {
    const user = { id, password };

    mutate(user);

    // e.preventDefault();
    // fetch(`${process.env.REACT_APP_BASE_URL}/user/login/test`, {
    //   method: "POST", // *GET, POST, PUT, DELETE 등
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data?.result) {
    //       localStorage.setItem("token", JSON.stringify(data?.token));
    //       window.location.replace("/");
    //     }
    //     alert(data.message);
    //   });
  };

  return (
    <div>
      <StyledTitle>로그인 페이지</StyledTitle>
      <StyledForm onSubmit={handleSubmit(onValid)}>
        <StyledInput
          placeholder="id"
          {...register("id", {
            required: "id를 입력해주세요",
            maxLength: 20,
            pattern: {
              // value:
              //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              message: "올바른 이메일을 입력해주세요",
            },
          })}
          type="id"
        />
        <span>{errors?.id?.message}</span>

        <StyledInput
          placeholder="password"
          {...register("password", { required: "비밀번호를 입력해주세요" })}
          type="password"
          autoComplete={"off"}
        />
        <span>{errors?.password?.message}</span>

        <StyledButton onClick={handleSubmit(onValid)}>로그인</StyledButton>
      </StyledForm>
    </div>
  );
};

export default LogIn;
