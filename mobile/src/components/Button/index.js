import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from './styles';

export default function Button({ children, color, loading, ...rest }) {
  return (
    <Container {...rest} color={color}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  color: undefined,
  loading: false,
};
