import { ChangeEvent, MouseEvent, ReactNode, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { BtnsInInput, NumberInputWrap } from "./input.styles";
import { FlatBtn } from "../styles";
import { BaseInput } from "./Input";
import classNames from "classnames";

export interface NumberInputProps extends BaseInput {
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  validate?: (value: string) => boolean;
  translate?: (value: string) => string;
  min?: string;
  max?: string;
  spinner?: boolean;
}
export const NumberInput = (props: NumberInputProps) => {
  const dom = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.validate && e.target.value && !props.validate(e.target.value))
      return;
    props.setValue(
      props.translate
        ? props.translate(
            translateByLimits(e.target.value, props.min, props.max)
          )
        : translateByLimits(e.target.value, props.min, props.max)
    );
  };
  const up = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.setValue(getNextInteger(props.value, true, props.min, props.max));
  };
  const down = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.setValue(getNextInteger(props.value, false, props.min, props.max));
  };
  const onClick = () => {
    if (!props.disabled) dom.current?.focus();
  };

  return (
    <NumberInputWrap
      className={classNames(props.className, { disabled: props.disabled })}
      id={props.id}
      onClick={onClick}
    >
      {props.prefix ? <span className="prefix">{props.prefix}</span> : null}
      {props.label ? <span className="label">{props.label}</span> : null}
      <input
        type="number"
        placeholder={props.placeholder}
        value={props.value}
        min={props.min}
        max={props.max}
        onChange={onChange}
        ref={dom}
        data-testid="input"
        disabled={props.disabled}
      />
      {props.spinner && (
        <BtnsInInput>
          <FlatBtn onClick={up} data-testid="up">
            <FontAwesomeIcon icon={faCaretUp} size="xs" />
          </FlatBtn>
          <FlatBtn onClick={down} data-testid="down">
            <FontAwesomeIcon icon={faCaretDown} size="xs" />
          </FlatBtn>
        </BtnsInInput>
      )}
      {props.suffix ? (
        <span className="suffix" data-testid="suffix">
          {props.suffix}
        </span>
      ) : null}
    </NumberInputWrap>
  );
};

const translateByLimits = (val: string, min?: string, max?: string) => {
  if (val === "" || Number.isNaN(Number(val))) return val;
  let res = val;
  if (min !== undefined && !Number.isNaN(min) && Number(res) < Number(min))
    res = min;
  if (max !== undefined && !Number.isNaN(max) && Number(res) > Number(max))
    res = max;
  return res;
};

const getNextInteger = (
  val: string,
  bigger: boolean,
  min?: string,
  max?: string
): string => {
  if (Number.isNaN(Number(val))) return val;
  const next = bigger ? Number(val) + 1 : Number(val) - 1;
  if (min !== undefined && !Number.isNaN(min) && Number(min) > next) return min;
  if (max !== undefined && !Number.isNaN(max) && Number(max) < next) return max;
  return next.toLocaleString("fullwide", { useGrouping: false });
};
