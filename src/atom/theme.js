import { atom } from "recoil";

const isDarkJson = JSON.parse(localStorage.getItem("isDark"));

export const isDark = atom({
  key: "isDark",
  default: isDarkJson ? true : false,
});
