import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';

import { Container, Title, Buttons, Button, Text } from './styles';
import ListDeliveries from '~/components/ListDeliveries';

export default function CustomTabView({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'pending', title: 'Pendentes' },
    { key: 'delivered', title: 'Entregues' },
  ]);

  function handleIndexChange(i) {
    setIndex(i);
  }

  function renderTabBar() {
    return (
      <Container>
        <Title>Entregas</Title>

        <Buttons>
          {routes.map((route, i) => {
            return (
              <Button key={String(i)} onPress={() => setIndex(i)}>
                <Text selected={i === index}>{route.title}</Text>
              </Button>
            );
          })}
        </Buttons>
      </Container>
    );
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'pending':
            return <ListDeliveries navigation={navigation} mode="pending" />;
          case 'delivered':
            return <ListDeliveries navigation={navigation} mode="delivered" />;
          default:
            return null;
        }
      }}
      renderTabBar={renderTabBar}
      onIndexChange={handleIndexChange}
    />
  );
}

CustomTabView.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};
