import React from 'react';
import { Text } from 'react-native';
import Background from '~/components/Background';
import { Container } from './styles';

export default function Confirm() {
  return (
    <Background>
      <Container>
        <Text>Tela de confirmação</Text>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = () => ({
  title: 'Confirmar entrega',
});
