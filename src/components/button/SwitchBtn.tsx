import { MouseEvent, ReactNode } from "react";
import { Base } from "../interface";
import { SwitchWrap } from "./button.styles";

interface BtnProps extends Base {
  isON: boolean;
  switch: (e: MouseEvent<HTMLButtonElement>) => void;
  onLabel: ReactNode;
  offLabel: ReactNode;
  disabled?: boolean;
}
const SwitchBtn = (props: BtnProps) => {
  return (
    <SwitchWrap
      className={props.className}
      id={props.id}
      onClick={props.switch}
      disabled={props.disabled}
    >
      {props.isON ? props.onLabel : props.offLabel}
    </SwitchWrap>
  );
};

export default SwitchBtn;
