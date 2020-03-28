import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';
import { Form as UnForm, Input as UnInput } from '@rocketseat/unform';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50%{
    transform: scale(1.05);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
`;

export const Form = styled(UnForm)`
  width: 100%;
  max-width: 360px;
  padding: 60px 30px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appear} 350ms linear backwards;

  img {
    height: 44px;
    margin-bottom: 40px;
  }

  strong {
    text-transform: uppercase;
    margin-bottom: 9px;
    color: #444444;
  }

  strong,
  input,
  button {
    align-self: stretch;
  }

  span {
    color: #de3b3b;
    padding-top: 5px;
    padding-bottom: 10px;
    display: block;
    align-self: stretch;
  }

  input {
    padding: 12px 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    color: #999999;
    font-size: 16px;

    &::placeholder {
      color: #999999;
    }

    + strong {
      margin-top: 15px;
    }
  }

  button {
    margin-top: 15px;
    border: none;
    background: #7d40e7;
    border-radius: 4px;
    font-size: 16px;
    padding: 12px;
    color: #fff;
    font-weight: bold;
    transition: background 0.2s;
    height: 42px;

    &:hover {
      background: ${darken(0.2, '#7d40e7')};
    }

    svg {
      width: 20px;
      height: 20px;
      animation: ${rotate} 2s linear infinite;
    }
  }
`;

export const Input = styled(UnInput)``;
