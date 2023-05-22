import styled from "styled-components";
import { Center } from "../styles";
import { SelectWrap } from "../select/select.styles";
import { InputWrap } from "../input/input.styles";

export const SelectInputWrap = styled(Center)`
  box-sizing: border-box;
  position: relative;
  width: 24rem;
  height: 3rem;
  border: 1px solid #d6d8dc;
  &.disabled {
    opacity: 0.6;
  }
  ${SelectWrap} {
    width: 25%;
    button.trigger {
      opacity: 1;
      border: none;
    }
    .options {
      width: 24rem;
      left: -1px;
    }
  }
  .divider_h {
    margin: 0;
    height: 1.6rem;
  }
  ${InputWrap} {
    width: 75%;
    opacity: 1;
    border: none;
  }
`;
