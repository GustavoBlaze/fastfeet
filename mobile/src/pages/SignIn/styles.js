import styled from 'styled-components/native';
import { darken } from 'polished';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #7d40e7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 45px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin-top: 37px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  align-self: stretch;
  height: 45px;
  color: ${darken(0.2, '#999')};
  padding: 12px 20px;
  font-size: 16px;
`;

export const ErrorLabel = styled.Text`
  margin-top: 5px;
  align-self: stretch;
  text-align: left;
  color: #e74040;
  font-weight: bold;
  font-size: 15px;
`;

export const SubmitButton = styled(Button).attrs({ color: '#82BF18' })`
  align-self: stretch;
  margin-top: 15px;
`;
