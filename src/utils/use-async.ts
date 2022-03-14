/* 管理异步请求的数据、loading、error信息 */
import { useCallback, useReducer } from "react";
import { useMountedRef } from "./index";

interface States<D> {
  error: Error | null; // 请求的error信息
  data: D | null; // 请求返回的数据
  state: "idle" | "loading" | "error" | "success"; // 请求状态idle：请求前、loading：请求中、error： 请求报错、success：请求成功
}

// 默认状态值
const defaultInitStates: States<null> = {
  state: "idle",
  error: null,
  data: null,
};

// 当组件还未挂载或卸载时不继续dispatch
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

// 请求中后处理state
export const useAsync = <D>(initStates?: States<D>) => {
  const [state, dispatch] = useReducer(
    // 传入state的某个键值, 并返回改变后的state
    (state: States<D>, action: Partial<States<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitStates,
      ...initStates,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        error: null,
        state: "success",
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        error: error,
        state: "error",
      });
    },
    [safeDispatch]
  );

  // run触发异步请求
  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise型数据");
      }
      safeDispatch({ state: "loading" });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [setError, safeDispatch, setData]
  );

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    isSuccess: state.state === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
