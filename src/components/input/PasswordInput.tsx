import { MouseEvent, ReactNode, useState } from "react";
import { Base } from "../interface";
import Input from ".";
import SwitchBtn from "../button/SwitchBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { SwitchInInput } from "./input.styles";

interface InputProps extends Base {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  prefix?: ReactNode;
  disabled?: boolean;
  validate?: (value: string) => boolean;
  translate?: (value: string) => string;
}
const PasswordInput = (props: InputProps) => {
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
            onLabel={<FontAwesomeIcon icon={solid("eye")} />}
            offLabel={<FontAwesomeIcon icon={solid("eye-slash")} />}
          />
        </SwitchInInput>
      }
    />
  );
};

export default PasswordInput;
