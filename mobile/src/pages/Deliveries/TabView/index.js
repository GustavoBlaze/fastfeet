import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabView } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

import { Container, Title, Buttons, Button, Text, Line } from './styles';
import ListDeliveries from '~/components/ListDeliveries';
import { interpolateColors } from '~/util/interpolateColors';

export default function CustomTabView({ navigation }) {
  const [index, setIndex] = useState(0);
  const [position] = useState(() => new Animated.Value(0));
  const [routes] = useState([
    { key: 'pending', title: 'Pendentes' },
    { key: 'delivered', title: 'Entregues' },
  ]);

  function handleIndexChange(i) {
    setIndex(i);
  }

  function renderTabBar() {
    const inputRange = routes.map((x, i) => i);

    const left = Animated.interpolate(position, {
      inputRange,
      outputRange: [0, 85],
    });

    return (
      <Container>
        <Title>Entregas</Title>

        <Buttons>
          {routes.map((route, i) => {
            const color = interpolateColors(
              position,
              inputRange,
              inputRange.map((item) => (item === i ? '#7D40E7' : '#999999'))
            );

            return (
              <Button
                selected={index === i}
                key={String(i)}
                onPress={() => setIndex(i)}
              >
                <Text style={{ color }}>{route.title}</Text>
              </Button>
            );
          })}

          <Line style={{ left }} />
        </Buttons>
      </Container>
    );
  }
  return (
    <TabView
      position={position}
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
