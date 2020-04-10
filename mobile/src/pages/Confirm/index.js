import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StackActions, NavigationActions } from 'react-navigation';
import Background from '~/components/Background';

import {
  Container,
  CameraContainer,
  Preview,
  StyledCamera,
  SnapButton,
  SendButton,
  CloseButton,
} from './styles';

import api from '~/services/api';

export default function Confirm({ navigation }) {
  const deliveryId = navigation.getParam('deliveryId');
  const deliverymanId = useSelector((store) => store.deliveryman.profile.id);

  const [picture, setPicture] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const camera = useRef(null);

  function navigationReset() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Deliveries' })],
    });
    navigation.dispatch(resetAction);
  }

  async function takePicture() {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.current.takePictureAsync(options);
      setPicture(data.uri);
      setConfirm(false);
    }
  }

  function handleCancel() {
    setPicture(null);
  }

  async function handleSubmit() {
    if (!confirm) {
      setConfirm(true);
      return;
    }

    setConfirm(false);
    setLoading(true);

    try {
      // eslint-disable-next-line no-undef
      const data = new FormData();
      data.append('file', {
        type: 'image/jpeg',
        uri: picture,
        name: picture.split('/').pop(),
      });

      const response = await api.post('files', data);

      const signature_id = response.data.id;

      await api.put(`/deliveryman/${deliverymanId}/deliveries/${deliveryId}`, {
        signature_id,
      });

      Toast.show('Entrega finalizada');
      setLoading(false);
      navigationReset();
    } catch (err) {
      console.tron.log({ err });
      Alert.alert(
        'Erro ao confirmar entrega',
        'Não foi possível confirmar a entrega'
      );
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <CameraContainer style={{ elevation: 3 }}>
          {picture ? (
            <>
              <Preview source={{ uri: picture }} />
              <CloseButton onPress={handleCancel}>
                <Icon color="#FFFFFF" size={26} name="close" />
              </CloseButton>
            </>
          ) : (
            <StyledCamera
              ref={camera}
              captureAudio={false}
              type={StyledCamera.Constants.Type.back}
              flashMode={StyledCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            >
              <SnapButton onPress={takePicture}>
                <Icon color="#FFFFFF" size={26} name="camera-alt" />
              </SnapButton>
            </StyledCamera>
          )}
        </CameraContainer>
        <SendButton
          enabled={!!picture}
          onPress={handleSubmit}
          loading={loading}
        >
          {confirm ? 'Tem certeza que deseja enviar?' : 'Enviar'}
        </SendButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = () => ({
  title: 'Confirmar entrega',
});

Confirm.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
