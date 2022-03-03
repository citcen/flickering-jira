// 避免数字 0 返回false
import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 清除空的object
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

// useMont包装页面加载后的操作（useEffect）
export const useMount = (callback: () => void) => {
  useEffect(() => {
    if (callback && typeof callback === "function") {
      callback();
    }
  }, []);
};

// 防抖
export const useDebounce = <D>(value: D, delay?: number) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounce;
};
