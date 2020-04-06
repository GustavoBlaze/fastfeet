import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import {
  Container,
  AvatarContainer,
  Avatar,
  Title,
  SubTitle,
  LogoutButton,
} from './styles';

export default function Profile() {
  const profile = useSelector((store) => store.deliveryman.profile);
  const formattedData = format(parseISO(profile.createdAt), 'dd/MM/yyyy');
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <AvatarContainer>
          <Avatar name={profile.name} avatar={profile.avatar} />
        </AvatarContainer>

        <Title>Nome Completo</Title>
        <SubTitle>{profile.name}</SubTitle>

        <Title>Email</Title>
        <SubTitle>{profile.email}</SubTitle>

        <Title>Data de cadastro</Title>
        <SubTitle>{formattedData}</SubTitle>

        <LogoutButton onPress={handleLogout}>Logout</LogoutButton>
      </Container>
    </>
  );
}

const TabBarIcon = ({ tintColor }) => (
  <Icon name="account-circle" size={25} color={tintColor} />
);

TabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: TabBarIcon,
};
