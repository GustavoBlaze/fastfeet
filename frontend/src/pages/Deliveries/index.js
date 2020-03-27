import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import { PageTitle } from '~/styles/PageTittle';

import { Container, LetterAvatar, DeliveryStatus } from './styles';

import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';
import { letterAvatar, deliveryStatus } from '~/styles/colors';

export default function Deliveries() {
  return (
    <Container>
      <header>
        <PageTitle>Gerenciando encomendas</PageTitle>
      </header>
      <div>
        <SearchInput placeholder="Buscar por encomendas" />
        <Link to="/">
          <MdAdd color="#FFFFFF" size={26} />
          Cadastrar
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinátario</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#01</td>
            <td>Ludwing van Beethoven</td>
            <td>
              <LetterAvatar color={letterAvatar[0 % letterAvatar.length]}>
                JD
              </LetterAvatar>
              John Doe
            </td>
            <td>Rio do Sul</td>
            <td>Santa Catarina</td>
            <td>
              <DeliveryStatus color={deliveryStatus.delivered}>
                Entregue
              </DeliveryStatus>
            </td>
            <td>
              <Actions>
                <Link to="/deliveries">
                  <MdRemoveRedEye size={24} color="#8E5BE8" />
                  Visualizar
                </Link>
                <Link to="/deliveries">
                  <MdEdit size={24} color="#4D85EE" />
                  Editar
                </Link>
                <Link to="/deliveries">
                  <MdDeleteForever size={24} color="#DE3B3B" />
                  Excluir
                </Link>
              </Actions>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
