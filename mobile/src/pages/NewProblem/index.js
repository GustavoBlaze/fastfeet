import React, { useState, useMemo, useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions } from 'react-navigation';
import Background from '~/components/Background';

import { Container, TextArea, SendButton } from './styles';

import api from '~/services/api';

export default function NewProblem({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');

  const [problem, setProblem] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setConfirm(false), [problem]);

  const enabled = useMemo(() => problem.replace(/\s/g, '').length > 0, [
    problem,
  ]);

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Deliveries' })],
    });
    navigation.dispatch(resetAction);
  }

  async function handleSubmit() {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    setConfirm(false);
    setLoading(true);

    try {
      await api.post(`delivery/${deliveryId}/problems`, {
        description: problem,
      });
      Toast.show('Problema enviado');
      setLoading(false);
      navigationReset();
    } catch (err) {
      Alert.alert(
        'Erro ao registrar',
        'Não foi possível registrar este problema, tente novamente em alguns minutos.'
      );
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <TextArea
          style={{ elevation: 3, textAlignVertical: 'top' }}
          placeholder="Inclua aqui o problema que ocorreu na entrega."
          value={problem}
          onChangeText={setProblem}
        />
        <SendButton onPress={handleSubmit} enabled={enabled} loading={loading}>
          {confirm ? 'Tem certeza que deseja enviar?' : 'Enviar'}
        </SendButton>
      </Container>
    </Background>
  );
}

NewProblem.navigationOptions = () => ({
  title: 'Informar problema',
});

NewProblem.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
