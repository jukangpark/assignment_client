import { atom, selector } from "recoil";

const todoListState = atom({
  key: "TodoList",
  default: [
    { text: "todo1", isComplete: false },
    { text: "todo2", isComplete: true },
  ],
});

export const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState); // 전체 리스트
    const totalNum = todoList.length; // 전체 할일 갯수
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length; // 완료된 할일 수
    const totalUncompletedNum = totalNum - totalCompletedNum; // 완료되지 않은 수
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;
    // 할일 퍼센티지

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

// selector 는 get 함수를 가지고 있다.
// get 함수는 첫번째 argument 로 option 이라는 object 를 가지고 온다.
// 객체 구조 분해 할당을 통해 get 을 option 으로부터 꺼내온다.
// get 은 state 를 가져올 수 있는데,
// get 함수에서 어떤 값을 return 하던지 간에 그 값은 저장하려는 state 의 값이 된다.

/* 
  set은 atom의 값을 변경하는 것을 도와준다. 
  get 함수에서도 atom에 접근할 수 있지만, set 함수는 원하는 state를 지정하여 수정할 수 있게 해준다.
  사용자가 지정한 element의 값이 특정 atom을 수정하는 역할을 부여하고 싶다면 해당 input에 값을 적는 것으로 set property 에서 state를 수정이 가능하다.
  set 함수는 첫번째 arguments로 get과 마찬가지로 option이라는 object를 제공한다. 
  디스트럭쳐링을 통해 set을 꺼내와 사용할 수 있고 두번째 argument는 값에 적용시킬 새로운 값이다.
  두번째 argument 자리에 식별자를 입력하고 console.log(식별자)라고 입력해보면 정보를 얻을 수 있다.

  먼저 컴포넌트에서 Recoil을 사용할 때, selector가 recoilValue를 사용하는 것 대신에 recoilState를 쓰게 한다. useRecoilState를 useState와 같이 사용할 수 있다. useRecoilState를 selector로 사용한다면 첫번째 아이템은 get property로부터 return한 값이다.(get)
  두번째는 set property가 부르는 함수, 즉 selector의 set property를 실행시키는 함수다.
  보다시피 일반 atom과 매우 비슷해보인다.
  set 함수를 사용할때 하나는 수정하고 싶은 atom을 가져오고 두번째로는 수정하고 싶은 값을 가져온다.

  중요한점은 selector는 하나의 atom만 get,set하지 않고 모든 아톰의 값을 사용할 수 있다.
*/

/* 
  export const hourSelector = selector({
  key: 'minuteConvertHours',
  get: ({ get }) => {
    const converter = get(minuteState);
    return (converter / 60).toFixed(2);
  },
  set: ({ set }, newValue) => {
    const hours = Number(newValue) * 60;
    set(minuteState, hours);
  },
});
*/
