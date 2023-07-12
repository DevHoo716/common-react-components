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
  width: 100%;
  height: ${(props) => props.height}px;
  overflowx: hidden;
  overflowy: scroll;
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

export const GroupLabelWrap = styled(Between)<{ height: number }>`
  position: sticky;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  cursor: pointer;
  span.spinner {
    display: block;
    transition: 120ms;
    svg {
      width: 1rem;
      height: 1rem;
      color: #4a4a4a;
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
`;
