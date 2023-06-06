import { ReactNode, useEffect, useMemo, useState } from "react";
import { Base } from "../interface";
import { ModalHandler } from "../hooks/handle_modal";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { ModalContent, ModalWrap, ScrollWrap } from "./modal.styles";

export interface ModalProps extends Base, ModalHandler {
  children?: ReactNode;
  wrapId?: string;
  width?: string;
  height?: string;
}

export const Modal = (props: ModalProps) => {
  const [ready, setReady] = useState(false);

  // To avoid react hydration error.
  // According to https://nextjs.org/docs/messages/react-hydration-error.
  useEffect(() => setReady(true), []);

  const wrap = useMemo(() => {
    if (globalThis.document !== undefined) {
      if (props.wrapId && globalThis.document.getElementById(props.wrapId)) {
        return globalThis.document.getElementById(props.wrapId);
      } else {
        return globalThis.document.body;
      }
    } else {
      return null;
    }
  }, [props.wrapId]);

  return ready && props.active && wrap
    ? ReactDOM.createPortal(
        <ModalWrap className={classNames(props.className)} id={props.id}>
          <ScrollWrap className="bg">
            <ModalContent width={props.width} height={props.height}>
              {props.children}
            </ModalContent>
          </ScrollWrap>
        </ModalWrap>,
        wrap
      )
    : null;
};
