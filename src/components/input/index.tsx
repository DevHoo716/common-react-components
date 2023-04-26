import { ChangeEvent, ReactNode, useRef } from "react";
import { Base } from "../interface";
import { InputWrap } from "./input.styles";

interface InputProps extends Base {
  value: string;
  setValue: (val: string) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  validate?: (value: string) => boolean;
  translate?: (value: string) => string;
}
const Input = (props: InputProps) => {
  const dom = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.validate && e.target.value && !props.validate(e.target.value))
      return;
    props.setValue(
      props.translate ? props.translate(e.target.value) : e.target.value
    );
  };
  const onClick = () => {
    if (props.disabled) return;
    if (dom.current) dom.current.select();
  };

  return (
    <InputWrap id={props.id} onClick={onClick}>
      {props.prefix ? <span className="prefix">{props.prefix}</span> : null}
      {props.label ? <span className="label">{props.label}</span> : null}
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
        ref={dom}
      />
      {props.suffix ? <span className="suffix">{props.suffix}</span> : null}
    </InputWrap>
  );
};

export default Input;
