import React from 'react';
import PropTypes from 'prop-types';

import {
  MdFirstPage,
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
} from 'react-icons/md';

import { Container, Text, Buttons, Button } from './styles';

export default function Pagination({
  total = 0,
  pages = 1,
  page = 1,
  callback,
}) {
  function handleFirstPage() {
    callback(1);
  }

  function handlePrevPage() {
    callback(page - 1);
  }

  function handleNextPage() {
    callback(page + 1);
  }

  function handleLastPage() {
    callback(pages);
  }

  return (
    <Container>
      <Text>{total} registros</Text>

      <Buttons>
        <Button disabled={page === 1} onClick={handleFirstPage}>
          <MdFirstPage color="#FFF" size={20} />
        </Button>
        <Button disabled={page === 1} onClick={handlePrevPage}>
          <MdChevronLeft color="#FFF" size={20} />
        </Button>
        <Text>{`${page} / ${pages}`}</Text>
        <Button disabled={page === pages} onClick={handleNextPage}>
          <MdChevronRight color="#FFF" size={20} />
        </Button>
        <Button disabled={page === pages} onClick={handleLastPage}>
          <MdLastPage color="#FFF" size={20} />
        </Button>
      </Buttons>
    </Container>
  );
}

Pagination.defaultProps = {
  total: 0,
  pages: 1,
  page: 1,
};

Pagination.propTypes = {
  total: PropTypes.number,
  pages: PropTypes.number,
  page: PropTypes.number,
  callback: PropTypes.func.isRequired,
};
