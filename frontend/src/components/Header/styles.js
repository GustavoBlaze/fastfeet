import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  padding: 6px 30px;
  border-bottom: 1px solid #dddddd;
  min-height: 64px;

  a:first-child {
    padding-right: 25px;
    border-right: 1px solid #dddddd;
    margin-right: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    img {
      width: auto;
      height: 26px;
    }
  }

  a:not(:first-child) {
    color: #999999;
    font-size: 15px;
    font-weight: bold;
    transition: color 300ms;
    text-transform: uppercase;

    &:hover, &[data-name=${(props) => props.locationName}] {
      color: #444444;
    }

    & + a {
      margin-left: 19px;
    }
  }

  div:last-child {
    margin-left: auto;
    text-align: center;

    strong {
      color: #666666;
      display: block;
      margin-bottom: 5px;
    }

    button {
      border: none;
      outline: 0;
      background: none;
      color: #de3b3b;
      transition: color 300ms;

      &:hover {
        color: ${darken(0.1, '#de3b3b')};
      }
    }
  }
`;
