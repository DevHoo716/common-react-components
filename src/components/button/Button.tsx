import { Base } from "../interface";
import { Btn } from "./button.styles";
import { ReactNode, MouseEvent } from "react";

export interface ButtonProps extends Base {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}
export const Button = (props: ButtonProps) => {
  return (
    <Btn className={props.className} id={props.id} onClick={props.onClick}>
      {props.children}
    </Btn>
  );
};
