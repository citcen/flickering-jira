// 避免数字 0 返回false
import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

// 清除空的object
export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// useMont包装页面加载后的操作（useEffect）
export const useMount = (callback) => {
  useEffect(() => {
    if (callback && typeof callback === "function") {
      callback();
    }
  }, []);
};

//
export const useDebounce = (value, delay) => {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounce;
};
