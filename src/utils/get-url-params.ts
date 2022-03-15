import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

// 读写页面中url带的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) };
        }, {} as { [key in K]: string }), // 返回值的key为String
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator。fromEntries把键值对装换成对象
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const; // 断言确定返回的数组类型，而不是可能的类型推断
};
