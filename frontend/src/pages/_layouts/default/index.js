import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import Header from '~/components/Header';

export default function DefaultLayout({ children, locationName = undefined }) {
  return (
    <Wrapper>
      <Header locationName={locationName} />
      <Content>{children}</Content>
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locationName: PropTypes.string.isRequired,
};
