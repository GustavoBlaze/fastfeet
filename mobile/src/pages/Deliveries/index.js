import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Header,
  Avatar,
  WelcomeContainer,
  Welcome,
  Name,
  LogoutContainer,
} from './styles';

import ListDeliveries from '~/components/ListDeliveries';

import { signOut } from '~/store/modules/auth/actions';

function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector((store) => store.deliveryman.profile);
  const name =
    profile.name.split(' ').length > 2
      ? profile.name
          .split(' ')
          .splice(0, 2)
          .reduce((total, current) => (total += ` ${current}`))
      : profile.name;

  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <Header>
          <Avatar name={name} size={68} avatar={profile.avatar} />
          <WelcomeContainer>
            <Welcome>Bem vindo,</Welcome>
            <Name>{name}</Name>
          </WelcomeContainer>
          <LogoutContainer>
            <TouchableOpacity onPress={logout}>
              <Icon name="exit-to-app" size={25} color="#E74040" />
            </TouchableOpacity>
          </LogoutContainer>
        </Header>

        <ListDeliveries navigation={navigation} />
      </Container>
    </>
  );
}

Deliveries.navigationOptions = {
  headerShown: false,
};

Deliveries.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Deliveries;
