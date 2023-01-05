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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const App = () => {
  const isDarkState = useRecoilValue(isDark);

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

// App 전체에서 리엑트 쿼리를 사용하기 위해서는
// QueryClientProvider 를 최상단에서 감싸주고
// queryClient 를 props 로 넘겨줘야 합니다.

// 워터폴 현상
// 컴포넌트 1에서 데이터 1을 요청… 가져오는 동안 로딩 화면만을 렌더링(3초 소요)
// 컴포넌트 1에서 데이터 1의 응답을 받고 컴포넌트 2를 렌더링
// 컴포넌트 2에서 데이터 2를 요청… 가져오는 동안 로딩 화면만을 렌더링(2초 소요)
// 컴포넌트 2에서 데이터 2의 응답을 받고 컴포넌트 3을 렌더링
// 이 상황에서 무조건 데이터 1에 대한 응답을 받고 나서야 데이터 2에 대한 요청이 실행된다. 데이터 2에 대한 요청 자체는 2초만 소요됨에도 불구하고 데이터 1에 대한 요청 때문에 3초를 무조건 기다려야 하는 문제가 발생하는 것이다. 참고 코드

// 이러한 문제는 컴포넌트 렌더링 -> data fetching 요청 -> data 응답과 같이 동작하는 구조 때문에 일어난다. 이 문제를 data fetching 라이브러리는 컴포넌트 트리 구조에 필요한 모든 data fetching 요청을 렌더링 이전에 실행하도록 중앙화하여 해결한다.
// 즉 data fetching 요청 -> data 응답 -> 컴포넌트 렌더링의 구조로 바뀌는 것이다.
