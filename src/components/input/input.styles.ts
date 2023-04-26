import styled from "styled-components";
import { Between } from "../styles";

export const InputWrap = styled(Between)`
  width: 24em;
  height: 3em;
  padding: 0 1em;
  border: 1px solid #d6d8dc;
  cursor: text;
  input {
    flex: 1;
    height: 100%;
    line-height: 1em;
    font-size: 1em;
    background: none;
    border: none;
    outline: none;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  span.label {
    line-height: 1em;
    font-size: 1em;
    font-weight: 700;
    color: #4a4a4a;
    padding-right: 0.5em;
  }
  span.suffix,
  span.prefix {
    svg {
      color: #4a4a4a;
    }
  }
  span.prefix {
    padding-right: 0.5rem;
  }
  span.suffix {
    padding-left: 0.5rem;
  }
`;

export const SwitchInInput = styled.span`
  button {
    border: none;
    width: 1.3em;
    height: 1.3em;
  }
`;
