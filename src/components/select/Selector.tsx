import { ReactNode, useMemo, useRef, useState } from "react";
import { Base } from "../interface";
import { SelectWrap } from "./select.styles";
import { useClickOutside } from "../hooks/click_outside";
import { CenterBtn, FlatBtn } from "../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

export interface SelectorProps extends Base {
  value: ReactNode;
  setValue: (val: string | number) => void;
  options: { value: string | number; label: ReactNode }[];
  placeholder?: string;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
}

export const Selector = (props: SelectorProps) => {
  const dom = useRef<HTMLDivElement>(null);

  const [ac, setAc] = useState(false);

  useClickOutside(dom, () => setAc(false));

  const selected = useMemo(
    () => props.options.find((i) => i.value === props.value),
    [props.value, props.options]
  );
  const toggle = () => {
    if (!props.disabled) setAc(!ac);
  };
  const select = (val: string | number) => {
    props.setValue(val);
    setAc(false);
  };

  return (
    <SelectWrap className={props.className} id={props.id} ref={dom}>
      <CenterBtn
        className={classNames("trigger", { disabled: props.disabled })}
        onClick={toggle}
        data-testid="selector"
      >
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
        {selected ? (
          <span className="selected">{selected?.label}</span>
        ) : (
          <span className="placeholder">{props.placeholder}</span>
        )}
        <FontAwesomeIcon
          className={classNames("spinner", { ac })}
          icon={faCaretDown}
        />
        {props.suffix ? (
          <span className="suffix" data-testid="suffix">
            {props.suffix}
          </span>
        ) : null}
      </CenterBtn>
      <div
        className={classNames("options", { ac })}
        data-testid="selector-options"
      >
        {props.options.map((i, index) => (
          <FlatBtn key={index} onClick={() => select(i.value)}>
            {i.label}
          </FlatBtn>
        ))}
      </div>
    </SelectWrap>
  );
};
