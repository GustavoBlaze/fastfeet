import styled from 'styled-components/native';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding-bottom: 30px;
`;

export const CameraContainer = styled.View`
  border-radius: 4px;
  /* padding: 13px; */
  flex: 1;
  overflow: hidden;
  background: #fff;
`;

export const StyledCamera = styled(RNCamera)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 20px;
`;

export const Preview = styled.Image`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const CloseButton = styled(TouchableOpacity)`
  height: 62px;
  width: 62px;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
`;

export const SnapButton = styled(TouchableOpacity)`
  margin-top: auto;
  background: #0000004d;
  height: 62px;
  width: 62px;
  border-radius: 31px;
  justify-content: center;
  align-items: center;
`;

export const SendButton = styled(Button).attrs({
  color: '#7D40E7',
})`
  margin-top: 10px;
  align-self: stretch;
  opacity: ${(props) => (props.enabled ? 1 : 0.6)};
`;
