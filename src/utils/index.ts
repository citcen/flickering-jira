// 避免数字 0 返回false
import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 清除空的object
export const cleanObject = (object?: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  if (!object) {
    return {};
  }
  const result = { ...object };
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

// 当组件还未挂载或卸载时返回false，反之亦反
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
