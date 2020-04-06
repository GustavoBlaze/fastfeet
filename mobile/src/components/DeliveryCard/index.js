import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Header,
  Title,
  Footer,
  FooterItem,
  Small,
  SubTitle,
  Button,
  ButtonText,
} from './styles';

import Timeline from './Timeline';

export default function DeliveryCard({ navigation, delivery }) {
  return (
    <Container
      style={{
        elevation: 4,
      }}
    >
      <Content>
        <Header>
          <Icon size={25} name="local-shipping" color="#7D40E7" />
          <Title>{`Encomenda ${delivery.formattedId}`}</Title>
        </Header>

        <Timeline start={delivery.start_date} end={delivery.end_date} />
      </Content>
      <Footer>
        <FooterItem>
          <Small>Data</Small>
          <SubTitle>{delivery.formattedDate}</SubTitle>
        </FooterItem>

        <FooterItem>
          <Small>Cidade</Small>
          <SubTitle>{delivery.recipient.city}</SubTitle>
        </FooterItem>

        <FooterItem>
          <Button onPress={() => navigation.navigate('Detail', { delivery })}>
            <Small />
            <ButtonText>Ver detalhes</ButtonText>
          </Button>
        </FooterItem>
      </Footer>
    </Container>
  );
}

DeliveryCard.propTypes = {
  delivery: PropTypes.shape({
    formattedId: PropTypes.string.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    formattedDate: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      city: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
