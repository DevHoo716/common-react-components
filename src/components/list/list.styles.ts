import styled from "styled-components";
import { CenterBtn } from "../styles";

export const ScrollWrap = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #f2f2f2;
    border-radius: 1rem;
    transition: 120ms;
    &:hover {
      background: #ddd;
    }
  }
`;

export const ListWrap = styled.div<{ height: number; paddingTop: number }>`
  box-sizing: border-box;
  height: ${(props) => props.height}px;
  padding-top: ${(props) => props.paddingTop}px;
`;

export const ItemWrap = styled.div<{ height: number }>`
  box-sizing: border-box;
  height: ${(props) => props.height}px;
`;

export const GroupListWrap = styled.div<{ height: number }>`
  position: relative;
  box-sizing: border-box;
  height: ${(props) => props.height}px;
`;

export const LabelWrap = styled.div<{ height: number }>`
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: calc(100% - 0.5rem);
  height: ${(props) => props.height}px;
  z-index: 100;
  animation-duration: 120ms;
  animation-name: showUp;
  @keyframes showUp {
    0%: {
      opacity: 0;
    }
    100%: {
      opacity: 1;
    }
  }
`;

export const ToggleBtn = styled(CenterBtn)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border: 1px solid #d6d8dc;
  padding: 0 1rem;
  color: #4a4a4a;
  background: #fff;
  svg {
    width: 1rem;
    height: 1rem;
    color: #4a4a4a;
    transition: 120ms;
    transform: rotate(90deg);
    &.ac {
      transform: rotate(0);
    }
  }
`;
