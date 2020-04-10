import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  margin-left: 12px;
`;

export const Text = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #999999;

  ${(props) =>
    props.selected &&
    css`
      color: #7d40e7;
      text-decoration: underline;
    `}
`;
