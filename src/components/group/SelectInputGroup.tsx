import { ReactNode } from "react";
import { Base } from "../interface";
import { SelectInputWrap } from "./group.styles";
import { Input, Selector } from "..";
import { DividerBarH } from "../utils/DividerBar";
import classNames from "classnames";

export interface SelectInputGroupProps extends Base {
  selected: ReactNode;
  setSelected: (val: string | number) => void;
  options: { value: string | number; label: ReactNode }[];
  value: string;
  setValue: (val: string) => void;
  selectPlaceholder?: string;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  validate?: (value: string) => boolean;
  translate?: (value: string) => string;
}

export const SelectInputGroup = (props: SelectInputGroupProps) => {
  return (
    <SelectInputWrap
      className={classNames(props.className, { disabled: props.disabled })}
      id={props.id}
    >
      <Selector
        placeholder={props.selectPlaceholder || "Select"}
        value={props.selected}
        setValue={props.setSelected}
        options={props.options}
        disabled={props.disabled}
      />
      <DividerBarH />
      <Input
        value={props.value}
        setValue={props.setValue}
        placeholder={props.placeholder}
        prefix={props.prefix}
        suffix={props.suffix}
        validate={props.validate}
        translate={props.translate}
        disabled={props.disabled}
        loading={props.loading}
      />
    </SelectInputWrap>
  );
};
