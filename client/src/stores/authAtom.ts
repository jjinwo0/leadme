import { atom } from "recoil";

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

export const accessTokenState = atom<string | null>({
  key: "accessTokenState",
  default: null,
});
