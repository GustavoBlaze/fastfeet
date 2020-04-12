import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';

import { Container, ActionList } from './styles';

export default function Actions({ children, w = undefined }) {
  const [visible, setVisible] = useState(false);

  function handleToggle() {
    setVisible(!visible);
  }

  const listener = useCallback(() => {
    if (visible) setVisible(false);
  }, [visible]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [listener]);

  return (
    <Container>
      <button type="button" onClick={handleToggle}>
        <MdMoreHoriz size={24} />
      </button>
      <ActionList visible={visible} onClick={handleToggle} w={w}>
        {children}
      </ActionList>
    </Container>
  );
}

Actions.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  ).isRequired,
  w: PropTypes.number,
};
