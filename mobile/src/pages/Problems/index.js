import React from 'react';
import PropTypes from 'prop-types';

import { format, parseISO } from 'date-fns';

import Background from '~/components/Background';

import {
  Container,
  Title,
  ProblemsList,
  ProblemCard,
  ProblemText,
  DateText,
  NoProblem,
  NoProblemContainer,
} from './styles';

export default function Problems({ navigation }) {
  const problems = navigation.getParam('problems').map((problem) => ({
    ...problem,
    formattedDate: format(parseISO(problem.createdAt), 'dd/MM/yyyy'),
  }));

  const formattedId = navigation.getParam('formattedId');

  return (
    <Background>
      <Container>
        <Title>{`Encomenda ${formattedId}`}</Title>

        {problems.length === 0 ? (
          <NoProblemContainer>
            <NoProblem>Nenhum problema com esta encomenda</NoProblem>
          </NoProblemContainer>
        ) : (
          <ProblemsList>
            {problems.map((problem) => (
              <ProblemCard key={problem.createdAt} style={{ elevation: 3 }}>
                <ProblemText>{problem.description}</ProblemText>
                <DateText>{problem.formattedDate}</DateText>
              </ProblemCard>
            ))}
          </ProblemsList>
        )}
      </Container>
    </Background>
  );
}

Problems.navigationOptions = () => ({
  title: 'Visualizar problemas',
});

Problems.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
