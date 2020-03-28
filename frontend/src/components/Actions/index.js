import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionList } from './styles';

export default function Actions({ children }) {
  const [visible, setVisible] = useState(false);

  function handleToggle() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button type="button" onClick={handleToggle}>
        <MdMoreHoriz size={24} />
      </button>
      <ActionList visible={visible} onClick={handleToggle}>
        {children}
      </ActionList>
    </Container>
  );
}

Actions.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
