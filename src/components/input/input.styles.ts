import styled from "styled-components";
import { Between } from "../styles";

export const InputWrap = styled(Between)`
  box-sizing: border-box;
  width: 24rem;
  height: 3rem;
  padding: 0 1rem;
  border: 1px solid #d6d8dc;
  cursor: text;
  line-height: 1rem;
  font-family: inherit;
  align-items: baseline;
  input {
    flex: 1;
    height: 100%;
    font-family: inherit;
    font-size: 1rem;
    background: none;
    border: none;
    outline: none;
    &::placeholder {
      color: #d9d9d9;
    }
  }
  span.label {
    font-size: 1rem;
    font-weight: 700;
    color: #4a4a4a;
    padding-right: 0.5rem;
  }
  span.suffix,
  span.prefix {
    font-size: 1rem;
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

export const NumberInputWrap = styled(InputWrap)`
  input::-webkit-inner-spin-button {
    display: none;
  }
`;

export const SwitchInInput = styled.span`
  button {
    border: none;
    width: 1.3rem;
    height: 1.3rem;
  }
`;

export const BtnsInInput = styled.span`
  display: flex;
  flex-direction: column;
  button {
    width: 1rem;
    height: 0.8rem;
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
