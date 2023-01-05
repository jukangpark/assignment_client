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
