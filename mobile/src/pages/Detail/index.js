import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';

import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';

import Background from '~/components/Background';
import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  Title,
  Subtitle,
  DateRow,
  DateContainer,
  TakeOutButton,
  Actions,
  ActionButton,
  ActionButtonText,
  VerticalSeparator,
} from './styles';

import api from '~/services/api';

export default function Detail({ navigation }) {
  const deliverymanId = useSelector((store) => store.deliveryman.profile.id);
  const [loading, setLoading] = useState(false);

  const {
    id,
    product,
    recipient,
    canceled_at,
    start_date,
    end_date,
    problems,
    formattedId,
  } = navigation.getParam('delivery');

  const formattedAddress = `${recipient.street}, ${recipient.number}${
    recipient.complement ? ` [${recipient.complement}]` : ``
  }, ${recipient.city} - ${recipient.state}`;

  let status = 'Pendente';

  if (canceled_at) status = 'Cancelada';
  else if (end_date) status = 'Entregue';
  else if (start_date) status = 'Retirada';

  const formattedStartDate = start_date
    ? format(parseISO(start_date), 'dd/MM/yyyy')
    : '-- / -- / --';

  const formattedEndDate = end_date
    ? format(parseISO(end_date), 'dd/MM/yyyy')
    : '-- / -- / --';

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Deliveries' })],
    });
    navigation.dispatch(resetAction);
  }

  async function handleTakeout() {
    setLoading(true);
    try {
      await api.put(`/deliveryman/${deliverymanId}/delivery/${id}`);
      setLoading(false);
      Toast.show('Encomenda retirada');
      navigationReset();
    } catch (err) {
      Alert.alert(
        'Erro ao retirar entrega',
        'Não foi possível retirar a entrega, tente novamente mais tarde'
      );
    }
    setLoading(false);
  }

  return (
    <Background>
      <Container>
        <Card style={{ elevation: 3 }}>
          <CardHeader>
            <Icon size={25} name="local-shipping" color="#7D40E7" />
            <CardTitle>Informações da entrega</CardTitle>
          </CardHeader>

          <Title>Destinatário</Title>
          <Subtitle>{recipient.name}</Subtitle>

          <Title>Endereço de entrega</Title>
          <Subtitle>{formattedAddress}</Subtitle>

          <Title>Produto</Title>
          <Subtitle>{product}</Subtitle>
        </Card>

        <Card style={{ elevation: 3 }}>
          <CardHeader>
            <Icon size={25} name="event" color="#7D40E7" />
            <CardTitle>Situação da entrega</CardTitle>
          </CardHeader>

          <Title>Status</Title>
          <Subtitle>{status}</Subtitle>

          <DateRow>
            <DateContainer>
              <Title>Data de retirada</Title>
              <Subtitle>{formattedStartDate}</Subtitle>
            </DateContainer>

            <DateContainer>
              <Title>Data de entrega</Title>
              <Subtitle>{formattedEndDate}</Subtitle>
            </DateContainer>
          </DateRow>
        </Card>

        {!start_date ? (
          <TakeOutButton loading={loading} onPress={handleTakeout}>
            Retirar encomenda
          </TakeOutButton>
        ) : (
          <>
            {!end_date && (
              <Actions style={{ elevation: 3 }}>
                <ActionButton
                  onPress={() =>
                    navigation.navigate('NewProblem', { deliveryId: id })
                  }
                >
                  <Icon name="highlight-off" color="#E74040" size={25} />
                  <ActionButtonText>Informar</ActionButtonText>
                  <ActionButtonText>Problema</ActionButtonText>
                </ActionButton>
                <VerticalSeparator />
                <ActionButton
                  onPress={() =>
                    navigation.navigate('Problems', { formattedId, problems })
                  }
                >
                  <Icon name="info-outline" color="#E7BA40" size={25} />
                  <ActionButtonText>Visualizar</ActionButtonText>
                  <ActionButtonText>Problemas</ActionButtonText>
                </ActionButton>
                <VerticalSeparator />
                <ActionButton
                  onPress={() =>
                    navigation.navigate('Confirm', { deliveryId: id })
                  }
                >
                  <Icon name="alarm-on" color="#7D40E7" size={25} />
                  <ActionButtonText>Confirmar</ActionButtonText>
                  <ActionButtonText>Entrega</ActionButtonText>
                </ActionButton>
              </Actions>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

Detail.navigationOptions = () => ({
  title: 'Detalhes',
});

Detail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
