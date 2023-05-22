import styled from "styled-components";

export const DividerH = styled.div<{
  length?: string;
}>`
  box-sizing: border-box;
  width: 1px;
  height: 80%;
  margin: 0 0.5rem;
  background: #d6d8dc;
`;

export const DividerV = styled.div`
  box-sizing: border-box;
  width: 80%;
  height: 1px;
  margin: 0 0.5rem;
  background: #d6d8dc;
`;
