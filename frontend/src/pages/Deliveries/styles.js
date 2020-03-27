import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  header {
    margin-bottom: 34px;
  }

  header + div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      padding: 0px 16px;
      color: #fff;
      font-weight: bold;
      font-size: 14px;
      background: #7d40e7;
      transition: background 300ms;
      border-radius: 4px;
      text-transform: uppercase;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 36px;

      svg {
        margin-right: 4px;
        margin-top: -5px;
        margin-bottom: -5px;
      }

      &:hover {
        background: ${darken(0.2, '#7D40E7')};
      }
    }
  }

  table {
    width: 100%;
    border-spacing: 0;

    thead th {
      color: #444444;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      padding-bottom: 12px;
      padding: 20px;

      &:last-child {
        text-align: center;
      }
    }

    tbody {
      tr {
        background: #fff;
        border-radius: 4px;

        td {
          padding: 12px;
          color: #666666;
          font-size: 16px;
          height: 35px;

          &:last-child {
            text-align: center;
          }
        }
      }
    }
  }
`;

export const LetterAvatar = styled.span`
  background: ${(props) => props.color};
  color: ${(props) => darken(0.3, props.color)};
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`;

export const DeliveryStatus = styled.span`
  background: ${(props) => props.color};
  color: ${(props) => darken(0.4, props.color)};
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 14px;
  display: inline-block;
  font-weight: bold;

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    margin-right: 6px;
    background: ${(props) => darken(0.4, props.color)};
  }
`;
