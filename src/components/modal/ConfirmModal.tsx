import { ReactNode } from "react";
import { Modal, ModalProps } from ".";
import { ModalBody, ModalFooter, ModalHeader } from "./modal.styles";
import { Button } from "..";

export interface ConfirmModalProps extends ModalProps {
  cb?: () => Promise<void>;
  label?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
}

export const ConfirmModal = (props: ConfirmModalProps) => {
  const confirm = async () => {
    if (props.cb) {
      props.close();
      await props.cb();
    }
  };

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
      <ModalHeader className="header">{props.label || "CONFIRM"}</ModalHeader>
      <ModalBody className="body">{props.children}</ModalBody>
      <ModalFooter className="footer">
        <Button className="yes-btn" onClick={confirm}>
          {props.confirmLabel || "Yes"}
        </Button>
        <Button className="cancel-btn" onClick={props.close}>
          {props.cancelLabel || "Cancel"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
