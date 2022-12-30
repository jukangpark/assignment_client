import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/api";
import Post from "../components/Post";

// npm i react-dotenv

/* 
  리엑트 쿼리는 데이터의 캐시 처리를 간편하게 할 수 있는 인터페이스를 제공합니다.
  몇 초 이후에 데이터가 유효하지 않은 것으로 간주하고 데이터를 다시 받아옵니다.
  데이터에 변경점이 있는 경우에만 리렌더링을 수행합니다.
  유저가 탭을 이동했다가 다시 돌아왔을 때 데이터를 다시 불러옵니다.
  데이터를 다시 호출할 때 응답이 오기 전까지는 이전 뎅터를 계속 보여줍니다.

  useQuery 에서 사용하게 되는 Query Key 는 React Query 에서 쿼리 캐싱을 관리하기 위한,
  unique key 로 사용됩니다.
  배열형태로 설정해줘야합니다
 */

const Home = () => {
  // const [posts, setPosts] = useState([]);

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"], // queryKey 는 반드시 배열이어야합니다.
    queryFn: getPosts,
  });

  console.log(posts);

  // useEffect(() => {
  //   const func = async () => {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}/posts/test`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     // setPosts(data);
  //   };
  //   try {
  //     func();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div>
      <h1>Home 페이지</h1>
      {posts?.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default Home;
