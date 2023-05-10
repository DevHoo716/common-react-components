import { ChangeEvent, ReactNode, useRef } from "react";
import { Base } from "../interface";
import { InputWrap } from "./input.styles";

export interface BaseInput extends Base {
  value: string;
  setValue: (val: string) => void;
  type?: string;
  placeholder?: string;
}
export interface InputProps extends BaseInput {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  validate?: (value: string) => boolean;
  translate?: (value: string) => string;
}
export const Input = (props: InputProps) => {
  const dom = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.validate && e.target.value && !props.validate(e.target.value))
      return;
    props.setValue(
      props.translate ? props.translate(e.target.value) : e.target.value
    );
  };
  const onClick = () => {
    if (!props.disabled) dom.current?.focus();
  };

  return (
    <InputWrap className={props.className} id={props.id} onClick={onClick}>
      {props.prefix ? (
        <span className="prefix" data-testid="prefix">
          {props.prefix}
        </span>
      ) : null}
      {props.label ? (
        <span className="label" data-testid="label">
          {props.label}
        </span>
      ) : null}
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        ref={dom}
        data-testid="input"
      />
      {props.suffix ? (
        <span className="suffix" data-testid="suffix">
          {props.suffix}
        </span>
      ) : null}
    </InputWrap>
  );
};
