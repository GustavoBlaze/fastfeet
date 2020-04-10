import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 3px;
  padding-bottom: 0;
`;

export const Header = styled.View`
  align-self: stretch;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #444444;
  font-size: 22px;
  font-weight: bold;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
`;

export const FilterButton = styled.TouchableOpacity`
  margin-left: 12px;
`;

export const FilterText = styled.Text`
  color: ${(props) => (props.selected ? '#7D40E7' : '#999999')};
  font-size: 13px;
  font-weight: bold;
  text-decoration: underline;
`;

export const Loading = styled(ActivityIndicator).attrs({
  size: 'large',
  color: '#7D40E7',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingMoreContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 5px;
  padding-bottom: 10px;
`;

export const LoadingMoreSpinner = styled(ActivityIndicator).attrs({
  size: 'small',
  color: '#7D40E7',
})``;

export const LoadingMoreText = styled.Text`
  color: #999;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
`;
export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;

export const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Lottie = styled(LottieView)`
  width: 30px;
  height: 30px;
`;

export const EmptyLabel = styled.Text`
  color: #ddd;
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
`;
