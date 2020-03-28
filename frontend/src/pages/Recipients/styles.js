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
`;

export const NameField = styled.td`
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  height: auto !important;
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
