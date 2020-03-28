import styled, { keyframes } from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

const containerAppear = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const divAppear = keyframes`
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  animation: ${containerAppear} 100ms linear backwards;

  hr {
    color: #00000033;
    margin: 10px 0;
    opacity: 0.3;
    border: 1px solid #00000033;
  }

  > div {
    background: #fff;
    padding: 5px 0;
    width: 100%;
    max-width: 450px;
    border-radius: 4px;
    animation: ${divAppear} 200ms linear backwards;

    strong {
      margin-bottom: 10px;
      font-size: 14px;
    }

    p {
      color: #444444;
      font-size: 16px;
      margin: 5px 0;
    }
    span {
      font-weight: bold;
      color: #666666;
    }
    img {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 90vh;
  padding: 25px;
`;
