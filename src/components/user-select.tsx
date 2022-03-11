import { useUsers } from "utils/use-api";
import { IdSelect } from "components/id-select";

export interface User {
  id: number;
  name: string;
  token: string;
}

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();

  return <IdSelect options={users || []} {...props} />;
};
