/*
 * 解决选择框string、number、空值的渲染问题
 * */
import { Select } from "antd";

// 获取Select类型
type selectProps = React.ComponentProps<typeof Select>;
// 继承 selectProps 并删掉可能存在的重复变量
interface PropsSelect
  extends Omit<selectProps, "options" | "value" | "onChange" | "defaultName"> {
  value?: number | string | null | undefined;
  onChange?: (value?: number) => void;
  options?: { name: string; id: number }[];
  defaultName?: string;
}

/**
 * value 可传多种类型
 * onChange只会回调 number|undefined 类型
 * 当isNaN(Number(value))为true的时候，代表选择默认类型
 * 当选择默认类型时，onChange会回调undefined
 *
 * */
export const IdSelect = (props: PropsSelect) => {
  const { value, onChange, options, defaultName, ...restProps } = props;
  return (
    <Select
      value={
        options?.length ? toNumber(value) : 0
      } /* 当数据没返回出来时显示默认值（负责人） */
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultName ? (
        <Select.Option value={0}>{defaultName}</Select.Option>
      ) : null}
      {options?.map((item) => {
        return (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
