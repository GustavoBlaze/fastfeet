import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function Header({ locationName = undefined }) {
  return (
    <Container locationName={locationName}>
      <Link to="/deliveries">
        <img src={logo} alt="FastFeet" />
      </Link>

      <Link data-name="deliveries" to="/deliveries">
        Encomendas
      </Link>
      <Link data-name="deliverymen" to="/deliverymen">
        Entregadores
      </Link>
      <Link data-name="recipients" to="/recipients">
        Destinatários
      </Link>
      <Link data-name="problems" to="/problems">
        Problemas
      </Link>

      <div>
        <strong>Admin FastFeet</strong>
        <button type="button">Sair do sistema</button>
      </div>
    </Container>
  );
}

Header.propTypes = {
  locationName: PropTypes.string,
};
