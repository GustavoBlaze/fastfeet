import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdRemoveRedEye, MdEdit, MdDeleteForever } from 'react-icons/md';

import {
  Container,
  DeliverymanField,
  Avatar,
  LetterAvatar,
  DeliveryStatus,
} from './styles';

import { PageTitle } from '~/styles/PageTittle';
import { deliveryStatus } from '~/styles/colors';

import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';
import Table from '~/components/Table';
import Pagination from '~/components/Pagination';
import LookDelivery from './LookDelivery';

import api from '~/services/api';
import history from '~/services/history';

import { createLetterAvatar } from '~/util/letterAvatar';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [looking, setLooking] = useState(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState('');

  const parseDeliveries = useCallback((data) => {
    return data.map((delivery, index) => {
      delivery.idText =
        delivery.id > 9 ? `#${delivery.id}` : `#0${delivery.id}`;

      if (delivery.deliveryman) {
        delivery.deliveryman.letterAvatar = createLetterAvatar(
          delivery.deliveryman.name,
          index
        );
      }

      if (delivery.canceled_at)
        delivery.status = {
          color: deliveryStatus.canceled,
          text: 'CANCELADA',
        };
      else if (delivery.end_date)
        delivery.status = {
          color: deliveryStatus.delivered,
          text: 'ENTREGUE',
        };
      else if (delivery.start_date)
        delivery.status = {
          color: deliveryStatus.takeout,
          text: 'RETIRADA',
        };
      else {
        delivery.status = {
          color: deliveryStatus.pending,
          text: 'PENDENTE',
        };
      }

      return delivery;
    });
  }, []);

  const handleLook = useCallback((delivery) => {
    setLooking(delivery);
  }, []);

  const handleEdit = useCallback((delivery) => {
    history.push(`/deliveries/edit/${delivery.id}`);
  }, []);

  const handleDelete = useCallback(
    async (delivery) => {
      // eslint-disable-next-line no-alert
      const gonnaDelete = window.confirm(
        `Tem certeza que deseja excluir a encomenda ${delivery.idText}?`
      );

      if (!gonnaDelete) return;

      await api.delete(`delivery/${delivery.id}`);
      toast.info(`A encomenda ${delivery.idText} foi excluída!`);
      setDeliveries(deliveries.filter(({ id }) => id !== delivery.id));
    },
    [deliveries]
  );

  async function handleSearch(search) {
    const response = await api.get(`delivery?q=${search}`);
    const data = parseDeliveries(response.data.items);
    setDeliveries(data);
    setSearchText(search);
    setPage(response.data.page);
    setPages(response.data.pages);
    setTotal(response.data.total);
  }

  async function handlePagination(n) {
    const params = {
      page: n,
      q: searchText,
    };

    const response = await api.get('delivery', { params });
    const data = parseDeliveries(response.data.items);
    setDeliveries(data);
    setPage(response.data.page);
    setPages(response.data.pages);
    setTotal(response.data.total);
  }

  useEffect(() => {
    async function getDeliveries() {
      const response = await api.get('delivery');
      const data = parseDeliveries(response.data.items);
      setDeliveries(data);
      setPage(response.data.page);
      setPages(response.data.pages);
      setTotal(response.data.total);
    }

    getDeliveries();
  }, [parseDeliveries]);

  return (
    <Container>
      <header>
        <PageTitle>Gerenciando encomendas</PageTitle>
      </header>
      <div>
        <SearchInput
          placeholder="Buscar por encomendas"
          callback={handleSearch}
        />
        <Link to="/deliveries/new">
          <MdAdd color="#FFFFFF" size={26} />
          Cadastrar
        </Link>
      </div>
      <Table>
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
          {deliveries.map(({ deliveryman, recipient, status, ...delivery }) => (
            <tr key={String(delivery.id)}>
              <td>{delivery.idText}</td>
              <td>{recipient?.name}</td>
              <DeliverymanField>
                {deliveryman && (
                  <>
                    {deliveryman.avatar ? (
                      <Avatar src={deliveryman.avatar.url} />
                    ) : (
                      <LetterAvatar color={deliveryman?.letterAvatar.color}>
                        {deliveryman?.letterAvatar.letters}
                      </LetterAvatar>
                    )}

                    {deliveryman.name}
                  </>
                )}
              </DeliverymanField>
              <td>{recipient?.city}</td>
              <td>{recipient?.state}</td>
              <td>
                <DeliveryStatus color={status.color}>
                  {status.text}
                </DeliveryStatus>
              </td>
              <td>
                <Actions>
                  <button
                    type="button"
                    onClick={() => handleLook({ ...delivery, recipient })}
                  >
                    <MdRemoveRedEye size={24} color="#8E5BE8" />
                    Visualizar
                  </button>
                  <button type="button" onClick={() => handleEdit(delivery)}>
                    <MdEdit size={24} color="#4D85EE" />
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(delivery)}>
                    <MdDeleteForever size={24} color="#DE3B3B" />
                    Excluir
                  </button>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        total={total}
        page={page}
        pages={pages}
        callback={handlePagination}
      />
      {looking && (
        <LookDelivery
          delivery={looking}
          closeCallback={() => setLooking(null)}
        />
      )}
    </Container>
  );
}
