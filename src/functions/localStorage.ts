import {GameHistory} from "../types";

export const getLocalStorage = (key: string): GameHistory => {
  const ls = localStorage.getItem(key);
  return ls ? JSON.parse(ls) : {victories: 0, defeats: 0};
}

export const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Created by carlos on 28/12/2022 */
