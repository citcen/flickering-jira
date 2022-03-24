import { useAsync } from "utils/use-async";
import { act, renderHook } from "@testing-library/react-hooks";

const defaultState: ReturnType<typeof useAsync> = {
  state: "idle",
  data: null,
  error: null,
  isIdle: true,
  isError: false,
  isLoading: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
};

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  state: "loading",
  isLoading: true,
  isIdle: false,
};

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  state: "success",
  isIdle: false,
  isSuccess: true,
};

test("useAsync 可以异步处理", async () => {
  let resolve: any, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  const { result } = renderHook(() => useAsync());

  // 异步调用前
  expect(result.current).toEqual(defaultState);

  // 异步调用中
  let p: Promise<any>;
  act(() => {
    p = result.current.run(promise);
  });
  expect(result.current).toEqual(loadingState);

  // 异步完成后
  const finishValue = { mockValue: "resolved" };
  await act(async () => {
    resolve(finishValue);
    await p;
  });
  expect(result.current).toEqual({
    ...successState,
    data: finishValue,
  });
});
