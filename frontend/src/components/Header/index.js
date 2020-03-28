import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container } from './styles';
import logo from '~/assets/logo.png';

import * as AuthActions from '~/store/modules/auth/actions';

export default function Header({ locationName = undefined }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(AuthActions.signOut());
  }

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
        <button type="button" onClick={handleSignOut}>
          Sair do sistema
        </button>
      </div>
    </Container>
  );
}

Header.propTypes = {
  locationName: PropTypes.string,
};
