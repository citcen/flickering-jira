/* 管理异步请求的数据、loading、error信息 */
import { useState } from "react";

interface States<D> {
  error: Error | null;
  data: D | null;
  state: "idle" | "loading" | "error" | "success";
}

const defaultInitStates: States<null> = {
  state: "idle",
  error: null,
  data: null,
};

export const useAsync = <D>(initStates?: States<D>) => {
  const [states, setStates] = useState<States<D>>({
    ...defaultInitStates,
    ...initStates,
  });

  const setData = (data: D) => {
    setStates({
      data,
      error: null,
      state: "success",
    });
  };

  const setError = (error: Error) =>
    setStates({
      data: null,
      error: error,
      state: "error",
    });

  // run触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入Promise型数据");
    }
    setStates({ ...states, state: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: states.state === "idle",
    isLoading: states.state === "loading",
    isError: states.state === "error",
    isSuccess: states.state === "success",
    run,
    setData,
    setError,
    ...states,
  };
};
