// 避免数字 0 返回false
import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 清除空的object
export const cleanObject = (obj: { [key: string]: unknown }) => {
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
export const useMount = (callback: () => void) => {
  useEffect(() => {
    let abortController = new AbortController();
    callback();
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// 页面title
export const useTitle = (title: string, keepThisTitle = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepThisTitle) {
        document.title = oldTitle;
      }
    };
  }, [keepThisTitle, oldTitle]);
};

// 重置到首页
export const resetRoute = () => (window.location.href = window.location.origin);
