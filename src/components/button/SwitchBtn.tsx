import { MouseEvent, ReactNode } from "react";
import { Base } from "../interface";
import { SwitchWrap } from "./button.styles";

export interface SwitchBtnProps extends Base {
  isON: boolean;
  switch: (e: MouseEvent<HTMLButtonElement>) => void;
  onLabel: ReactNode;
  offLabel: ReactNode;
  disabled?: boolean;
}
export const SwitchBtn = (props: SwitchBtnProps) => {
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
