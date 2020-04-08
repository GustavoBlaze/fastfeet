import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const ProblemsList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex-direction: column;
  flex: 1;
  margin-left: -5px;
  margin-right: -5px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 13px;
  align-self: stretch;
  text-align: center;
`;

export const ProblemCard = styled.View`
  align-self: stretch;
  border-radius: 4px;
  padding: 13px;
  background-color: #fff;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProblemText = styled.Text`
  font-size: 16px;
  color: #999999;
`;

export const DateText = styled.Text`
  font-size: 12px;
  color: #c1c1c1;
`;

export const NoProblemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoProblem = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #cacaca;
  text-align: center;
`;
