import Router from "./Router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "style/GlobalStyle";
import { ThemeProvider } from "styled-components";
import dark from "./theme/dark";
import light from "./theme/light";
import { useRecoilValue } from "recoil";
import { isDark } from "atom/theme";

const queryClient = new QueryClient();

const App = () => {
  const isDarkState = useRecoilValue(isDark);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDarkState ? dark : light}>
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />;
        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
