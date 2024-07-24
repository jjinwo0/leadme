import { atom } from "recoil";

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: sessionStorage.getItem("access_token"), // 세션에 값이 없으면 null 반환
});
