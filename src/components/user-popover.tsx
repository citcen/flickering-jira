import { Divider, List, Popover, Typography } from "antd";
import { useUsers } from "utils/use-api";
import styled from "@emotion/styled";
import { User } from "types/user";

export const UserPopover = () => {
  const { data: users, refetch } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map((user: User) => (
          <List.Item key={user.name}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
