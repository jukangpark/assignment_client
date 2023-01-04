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

const queryClient = new QueryClient();

const App = () => {
  const isDarkState = useRecoilValue(isDark);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkState ? dark : light}>
        <Suspense fallback={<div>Loading....</div>}>
          <Router />
        </Suspense>
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
