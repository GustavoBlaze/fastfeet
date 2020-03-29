import React from 'react';
import PropTypes from 'prop-types';
import { Container, Input as UnInput } from './styles';

export default function Input({ title, ...rest }) {
  return (
    <Container>
      <strong>{title}</strong>
      <UnInput {...rest} />
    </Container>
  );
}

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
