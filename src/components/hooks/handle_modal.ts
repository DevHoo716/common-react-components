import { useState } from "react";

export interface ModalHandler {
  active: boolean;
  popup: () => void;
  close: () => void;
}

export const useModalHandler = (value?: boolean) => {
  const [active, setAc] = useState(value || false);

  const popup = () => setAc(true);
  const close = () => setAc(false);

  return { active, popup, close };
};
