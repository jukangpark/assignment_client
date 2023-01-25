import Router from "./Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import dark from "./theme/dark";
import light from "./theme/light";
import { useRecoilValue } from "recoil";
import { isDark } from "atom/theme";
import { Suspense } from "react";
import Loading from "pages/Loading";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
import { useDispatch } from "react-redux";
import { authUser } from "slice/userSlice";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const isDarkState = useRecoilValue(isDark);
  const dispatch = useDispatch();

  dispatch(authUser());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkState ? dark : light}>
        <ErrorBoundary fallback={<div>Error...</div>}>
          <Suspense fallback={<Loading />}>
            <Router isLoggedIn={false} />
          </Suspense>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={true} size="10x" />
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

// React 16.6 부터 추가된 Suspense 라는 기능은 주로 JS 번들의 Lazy Loading 을 위한 기능이었습니다.
// Lazy Loading 이란 필요한 자원을 미리 가져오는게 아니라 필요할 때 가져오는 전략을 말합니다.
// 웹에서 모든 자원은 Lazy Loading 의 대상이 될 수 있음
// 스플리팅된 JS 번들이나 이미지는 Lazy Loading 의 대표적인 자원
// AJAX 역시 Lazy Loading 중 한 종류

// 그런데 React 18 에서는 무엇이든 기다릴 수 있는 기능으로 확장되었음.
// 명령형 프로그래밍 : "어떻게" HOW 에 초점
// 비동기 상태값을 가지고 어떤 UI를 보여줄지에 대한 분기 로직을 JSX에 코딩

// 선언형 프로그래밍 : "무엇을" WHAT 에 초점 ⇒ 비동기 상태값에 따른 UI를 Prop으로 주입하기

// 선언적 코드들은 최종목표에 관심이 있지.
// 해당 목표를 이루기 위한 세부적인 단계들에는 관심이 없다.
// 동일한 코드들이 다른 프로그램에 쓰이더라도 정상적으로 동작 -> content-independent 한 개발
// (전체적인 맥락, 상황에 독립적)
// '재사용성', '순수 함수' 와 일맥상통하는 부분
