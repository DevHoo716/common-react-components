import { ReactNode } from "react";
import { Modal, ModalProps } from ".";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  WarningLabel,
} from "./modal.styles";
import { Button } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export interface WarningModalProps extends ModalProps {
  label?: ReactNode;
  btnLabel?: ReactNode;
}

export const WarningModal = (props: WarningModalProps) => {
  return (
    <Modal
      className={props.className}
      id={props.id}
      active={props.active}
      close={props.close}
      popup={props.popup}
      wrapId={props.wrapId}
      width={props.width}
      height={props.height}
    >
      <ModalHeader className="header">
        {props.label || (
          <WarningLabel>
            <FontAwesomeIcon icon={faWarning} /> WARNING
          </WarningLabel>
        )}
      </ModalHeader>
      <ModalBody className="body">{props.children}</ModalBody>
      <ModalFooter className="footer">
        <Button className="btn" onClick={props.close}>
          {props.btnLabel || "Close"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
