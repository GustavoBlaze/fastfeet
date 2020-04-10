import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Avatar,
  WelcomeContainer,
  LogoutContainer,
  Welcome,
  Name,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
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
    <Container>
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
    </Container>
  );
}
