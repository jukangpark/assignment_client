import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools

// queryClientProvider 에는 하나의 컴포넌트만 들어가야해요

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </RecoilRoot>
);

// 컴포넌트가 마운트 되기 전에 state 를 불러왔기 때문에 에러가 발생할 수 있는데,
// 우리는 마운트가 완료된 이후에 데이터를 호출하기 위해 useEffect(()=> {},[]) 안에 호출 메서드를 넣어주었습니다.
// 그러나 useRecoilValue 는 react hook 이기 때문에 useEffect 안에서 사용할 수 없습니다.
// 그리고 공식홈페이지에서도 recoil 은 보류중인 데이터를 다루기 위해서 React Suspense 와 함께 동작하도록 디자인 되어 있습니다.
// 데이터 불러오기 시작 -> 렌더링 시작 -> 데이터 불러오기 완료 순서로 동작하는 데이터 호출 로직에서
// 데이터 호출 완료 여부를 인지하여 데이터 불러오기를 완료할 때 까지 fallback 속성으로 넣어준 컴포넌트를 표시하도록 되어 있습니다.

// 명령형 프로그래밍 에서는 기존의 비동기 처리를 useEffect() 라고 하는 훅을 사용해서,
// 데이터 패칭이 다 된 이후에, 무언가를 렌더링 하는 형식으로 진행하였다.

// 하지만 선언형 프로그래밍 에서는 코드의 순서가 중요하지 않고, 이런식으로 Suspense 라고 하는 걸 사용해서,
// 선언적으로 비동기 핸들링을 처리할 수 있다.

// Suspense 의 동작 방식
// Suspense 의 children 이 예외 처리로 promise 를 던지게 되면(throw), Suspense 는 fallback 프로퍼티를 렌더링하빈다.
// 예외로 처리된 promise 가 완료되면(fulfilled), Suspense 는 children 을 다시 렌더링 합니다.

// 리엑트에서 데이터를 fetch 할 때 렌더링 처리 하는 방법에는 2가지 방법이 있다.
// react hook 을 이용하는 방법 vs Suspense 를 활용하는 방법

// Fetch-on-render 컴포넌트 렌더링을 먼저 시작하고 useEffect 나 componentDidMount 로 비동기 처리를 하는걸 의미
// Fetch-then-render Relay without Suspense -> useEffect 나 componentDidMount 로 화면을 그리는데 필요한 데이터를 모두 조회한 후 렌더링을 시작하는 방법
// Render-as-you-fetch Relay with Suspense -> 비동기 작업과 렌더링 작업을 동시에 시작함. Suspense 는 초기에 fallback 프로퍼티를 렌더링하고, 비동기 작업이 완료되면,
// 자식 컴포넌트를 다시 재 렌더링 한다.

// Suspense 를 활용하게 되면,
/*
  1. 컴포넌트들이 각자 데이터 fetching 을 동시에 시작하여 waterfall 문제가 발생하지 않습니다.
  2. Suspense 의 계층 구조와 fallback 렌더링으로 컴포넌트들은 더 이상 경쟁 상태를 신경쓰지 않아도 됩니다.
  3. 컴포넌트들의 역할이 아주 명확하게 분리되고 결합도가 낮아집니다. (이제 컴포넌트들은 각자의 데이터를 가져와 보여주는 것만 신경쓰면됨)
  4. 동기화 코드가 사라지고 데이터 fetching 과 렌더링에만 신경쓰면 되기 때문에 컴포넌트들의 복잡도가 낮아졌습니다. (코드가 깔끔해졌습)

  Suspense 를 사용하게 됨으로써 컴포넌트들을 훨씬 선언적이고 깔끔하게 작성할 수 있다.
 */
