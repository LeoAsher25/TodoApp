export const getLocalStorage = (key: string): any => {
  if (localStorage.getItem(key) || localStorage.getItem(key) === "")
    return JSON.parse(localStorage.getItem(key)!);
  return null;
};

export const setLocalStorage = (key: string, value: any): void => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string): void => {
  return localStorage.removeItem(key);
};
