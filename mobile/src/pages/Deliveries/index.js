import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from './styles';

import Header from './Header';
import TabView from './TabView';

function Deliveries({ navigation }) {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <Container>
        <Header />

        <TabView navigation={navigation} />
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
