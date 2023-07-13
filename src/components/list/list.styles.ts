import styled from "styled-components";
import { Between, Center } from "../styles";

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
  }
  &:hover::-webkit-scrollbar-thumb {
    background: #ddd;
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
  width: 100%;
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

export const GroupLabelWrap = styled(Between)<{
  height: number;
  zIndex: number;
}>`
  position: sticky;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  cursor: pointer;
  padding: 0 1rem;
  border: 1px solid #d6d8dc;
  background: #f2f2f2;
  color: #4a4a4a;
  user-select: none;
  z-index: ${(props) => props.zIndex};
  span.spinner {
    display: block;
    svg {
      width: 1rem;
      height: 1rem;
      color: #4a4a4a;
      transition: 120ms;
      transform: rotate(0);
    }
    &.ac svg {
      transform: rotate(-90deg);
    }
  }
`;

export const GroupItemWrap = styled(Center)<{
  height: number;
  clickable: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  height: ${(props) => props.height}px;
  cursor: ${(props) => (props.clickable ? "pointer" : "default")};
  user-select: ${(props) => (props.clickable ? "none" : "auto")};
  justify-content: flex-start;
`;
