/* 通用组件 */
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import React from "react";

// flex行布局
export const ListRow = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}rem` : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? `${props.gap}rem`
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

// 没有padding的button
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

// 返回true, value就是Error类型
const isError = (value: any): value is Error => value?.messge;

// 报错提示组件
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }

  return null;
};

// 默认padding和flex布局的container
export const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.2rem;
  width: 100%;
`;
