import React from "react";
import styled from "@emotion/styled";
import { Typography } from "antd";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <FullPage>
          <Typography.Text type={"danger"}>
            {(error as Error)?.message}
          </Typography.Text>
        </FullPage>
      );
    }

    return this.props.children;
  }
}
