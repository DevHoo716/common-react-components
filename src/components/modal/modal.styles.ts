import styled from "styled-components";

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

export const ModalContent = styled.div<{ width?: string; height?: string }>`
  width: ${(props) => props.width || "40rem"};
  height: ${(props) => props.height || "12rem"};
  border: 1px solid #d6d8dc;
  background: #f2f2f2;
  margin: auto;
  box-shadow: 0 0 2rem #ccc;
`;
