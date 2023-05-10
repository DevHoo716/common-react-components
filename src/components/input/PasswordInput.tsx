import { MouseEvent, ReactNode, useState } from "react";
import { BaseInput, Input } from "./Input";
import SwitchBtn from "../button/SwitchBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SwitchInInput } from "./input.styles";

export interface PasswordInputProps extends BaseInput {
  label?: string;
  prefix?: ReactNode;
  disabled?: boolean;
}
export const PasswordInput = (props: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShow(!show);
  };

  return (
    <Input
      {...props}
      type={show ? "text" : "password"}
      suffix={
        <SwitchInInput>
          <SwitchBtn
            isON={show}
            switch={handleShow}
            onLabel={<FontAwesomeIcon icon={faEye} />}
            offLabel={<FontAwesomeIcon icon={faEyeSlash} />}
          />
        </SwitchInInput>
      }
    />
  );
};
