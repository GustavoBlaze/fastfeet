import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

export const Container = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const Buttons = styled.View`
  flex-direction: row;
`;

export const Line = styled(Animated.View)`
  background-color: #7d40e7;
  height: 2px;
  width: 90px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  width: 85px;
`;

export const Text = styled(Animated.Text)`
  font-size: 14px;
  font-weight: bold;
  color: #999;
`;
