import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 5px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 25px;
  margin-left: 3px;
  margin-right: 3px;
`;

export const Content = styled.View`
  padding: 13px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: #7d40e7;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Footer = styled.View`
  background: #f8f9fd;
  padding: 20px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FooterItem = styled.View`
  flex-direction: column;
`;

export const Small = styled.Text`
  font-weight: bold;
  font-size: 8px;
  color: #999999;
`;

export const SubTitle = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #444444;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled(SubTitle)`
  color: #7d40e7;
`;
