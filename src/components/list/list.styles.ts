import styled from "styled-components";

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
