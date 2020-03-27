import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Container } from './styles';

export default function SearchInput({ placeholder = '' }) {
  return (
    <Container>
      <MdSearch color="#999999" />
      <input type="text" name="search" placeholder={placeholder} />
    </Container>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
