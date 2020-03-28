import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Link to="/deliveries">
        <img src={logo} alt="FastFeet" />
      </Link>

      <Link to="/deliveries">Encomendas</Link>
      <Link to="/deliverymen">Entregadores</Link>
      <Link to="/recipients">Destinatários</Link>
      <Link to="/problems">Problemas</Link>

      <div>
        <strong>Admin FastFeet</strong>
        <button type="button">Sair do sistema</button>
      </div>
    </Container>
  );
}
