import { useSearchParams } from "react-router-dom";

// 返回页面中url带的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) };
    }, {} as { [key in K]: string }), // 返回值的key为String
    setSearchParams,
  ] as const; // 断言确定返回的数组类型，而不是可能的类型推断
};
