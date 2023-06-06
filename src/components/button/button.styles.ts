import styled from "styled-components";
import { FlatBtn } from "../styles";

export const Btn = styled(FlatBtn)`
  min-width: 3rem;
  height: 2.2rem;
  border: 1px solid #d6d8dc;
  background: #f2f2f2;
  box-shadow: 0 0 0.1rem #ccc;
  font-size: 1rem;
  font-weight: 700;
  color: #4a4a4a;
  padding: 0 0.8rem;
  transition: 120ms;
  &:hover {
    background: #fff;
  }
`;

export const SwitchWrap = styled(FlatBtn)`
  width: 3em;
  height: 3em;
  border: 1px solid #d6d8dc;
  color: #4a4a4a;
`;
