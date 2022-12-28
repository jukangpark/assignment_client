export const getPosts = async ({ queryKey }) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/test`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  //   console.log(response);

  return response.json();
};

// 네트 워크 요청이 실패하면 이상적으로는 쿼리가 오류 상태가 되기를 원할 것입니다.
// 그렇게 하지 않고, 성공한 쿼리가 표시된다면 이는 queryFn 이 실패한 promise 를 반환하지 않았음을 의미합니다.

// React Query 는 상태코드나 네트워크 요청에 대해 전혀 알지 못하고 신경쓰지 않습니다.
// queryFun 이 제공해야 하는 해결되거나, 거부된 Promise 가 필요합니다.

// 오류를 올바르게 처리하기 위해서는 React Query 에서 거부된 (rejected) 된 Promise 가 필요합니다.
// 운 좋게도 axios 를 사용하면 얻을 수 있다.

// 그러나 만약 당신이 fetchAPI 또는 4xx 나 5xx 와 같은 잘못된 상태 코드에 대해 거부된 Promise 를 제공하지 않는다면
// 다른 라이브러리를 사용하고 있다면, 당신은 직업 queryFn 을 통해 반환해야 합니다.
