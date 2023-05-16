import styled from "styled-components";
import { Between } from "../styles";

export const SelectWrap = styled(Between)`
  box-sizing: border-box;
  position: relative;
  width: 24rem;
  height: 3rem;
  button.trigger {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 0.1rem solid #d6d8dc;
    line-height: 1rem;
    color: #4a4a4a;
    padding: 0 1rem;
    font-family: inherit;
    span.label {
      font-size: 1rem;
      font-weight: 700;
      padding-right: 0.5rem;
    }
    span.selected,
    span.placeholder {
      flex: 1;
      font-size: 1rem;
      text-align: left;
    }
    span.placeholder {
      color: #d9d9d9;
    }
    svg.spinner {
      width: 0.7rem;
      opacity: 0.3;
      transition: 120ms;
      &.ac {
        transform: rotate(90deg);
      }
    }
    &:hover {
      svg.spinner {
        opacity: 0.8;
      }
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
  }
  .options {
    display: none;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 3.2rem;
    z-index: 100;
    width: 100%;
    max-height: 14rem;
    padding: 0.2rem 0 0.2rem 0.2rem;
    background: #fff;
    border: 0.1rem solid #d6d8dc;
    overflow-x: hidden;
    overflow-y: auto;
    &.ac {
      display: block;
    }
    &::-webkit-scrollbar {
      width: 0.3rem;
    }
    &::-webkit-scrollbar-track {
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background: #eee;
      border-radius: 1rem;
    }
    button {
      width: calc(100% - 0.2rem);
      height: 2.5rem;
      text-align: left;
      padding: 0 0.5rem;
      font-family: inherit;
      font-size: 1rem;
      &:hover {
        background: #eee;
      }
    }
  }
`;
