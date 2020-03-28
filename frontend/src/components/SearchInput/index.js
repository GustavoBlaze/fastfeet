import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import * as Yup from 'yup';
import { Form, Input } from './styles';

const schema = Yup.object().shape({
  search: Yup.string(),
});

export default function SearchInput({ placeholder = '', callback }) {
  function handleSubmit({ search }) {
    callback(search);
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <MdSearch color="#999999" />
      <Input type="text" name="search" placeholder={placeholder} />
    </Form>
  );
}

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
