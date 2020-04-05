import styled from 'styled-components/native';
import CustomAvatar from '~/components/Avatar';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 20px;
  padding-bottom: 0;
  flex-direction: column;
`;

export const Header = styled.View`
  align-self: stretch;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Avatar = styled(CustomAvatar)``;

export const WelcomeContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

export const Welcome = styled.Text`
  font-size: 13px;
  color: #666666;
`;

export const Name = styled.Text`
  font-size: 22px;
  color: #444444;
  font-weight: bold;
`;

export const LogoutContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
