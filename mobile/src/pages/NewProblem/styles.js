import styled from 'styled-components/native';
import { darken } from 'polished';
import Button from '~/components/Button';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  placeholderTextColor: '#999',
})`
  border-radius: 4px;
  padding: 13px;
  background-color: #fff;
  margin-bottom: 10px;
  font-size: 16px;
  color: ${darken(0.2, '#999')};
  justify-content: flex-start;
`;

export const SendButton = styled(Button).attrs({
  color: '#7D40E7',
})`
  align-self: stretch;
  opacity: ${(props) => (props.enabled ? 1 : 0.6)};
`;
