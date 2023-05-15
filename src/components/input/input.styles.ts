import styled from "styled-components";
import { Between } from "../styles";

export const InputWrap = styled(Between)`
  width: 24em;
  height: 3em;
  padding: 0 1em;
  border: 1px solid #d6d8dc;
  cursor: text;
  line-height: 1em;
  align-items: baseline;
  input {
    flex: 1;
    height: 100%;
    font-size: 1em;
    background: none;
    border: none;
    outline: none;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  span.label {
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
    padding-right: 0.5em;
  }
  span.suffix {
    padding-left: 0.5em;
  }
`;

export const NumberInputWrap = styled(InputWrap)`
  input::-webkit-inner-spin-button {
    display: none;
  }
`;

export const SwitchInInput = styled.span`
  button {
    border: none;
    width: 1.3em;
    height: 1.3em;
  }
`;

export const BtnsInInput = styled.span`
  display: flex;
  flex-direction: column;
  button {
    width: 1em;
    height: 0.8em;
    display: flex;
    align-items: center;
    svg {
      opacity: 0.5;
      color: #4a4a4a;
      pointer-events: none;
      transition: 120ms;
    }
    &:hover {
      svg {
        opacity: 0.8;
      }
    }
    &:active {
      svg {
        opacity: 1;
      }
    }
  }
`;
