import styled from "styled-components";
import { Center } from "../styles";

export const ModalWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  backdrop-filter: blur(0.3rem);
`;

export const ScrollWrap = styled.div`
  position: absolute;
  display: -webkit-box;
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
  top: 0;
  left: 0;
  padding: 2rem;
  overflow: auto;
  background: rgba(214, 214, 214, 0.7);
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #f2f2f2;
    border-radius: 1rem;
    &:hover {
      background: #fff;
    }
  }
`;

export const ModalContent = styled(Center)<{ width?: string; height?: string }>`
  flex-direction: column;
  width: ${(props) => props.width || "40rem"};
  height: ${(props) => props.height || "12rem"};
  border: 1px solid #d6d8dc;
  background: #f2f2f2;
  margin: auto;
  box-shadow: 0 0 2rem #ccc;
`;

export const ModalHeader = styled(Center)`
  box-sizing: border-box;
  width: 100%;
  height: 3.4rem;
  font-size: 1rem;
  font-weight: 700;
  color: #4a4a4a;
  cursor: default;
`;

export const ModalBody = styled(Center)`
  box-sizing: border-box;
  width: 100%;
  flex: 1;
  padding: 0 2rem;
  font-size: 1rem;
  color: #4a4a4a;
  cursor: default;
`;

export const ModalFooter = styled.div`
  box-sizing: border-box;
  width: 100%;
  text-align: right;
  padding: 1rem 2rem;
  button {
    margin-left: 0.5rem;
  }
`;

export const WarningLabel = styled(Center)`
  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: #ffc107;
    margin-right: 0.5rem;
  }
`;
