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
import { letterAvatar, deliveryStatus } from '~/styles/colors';

import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';
import LookDelivery from './LookDelivery';

import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [looking, setLooking] = useState(null);

  const createLetterAvatar = useCallback((name, index) => {
    const split = name.split(' ');
    const letters =
      split.length > 1
        ? split[0].charAt(0) + split[1].charAt(0)
        : split[0].charAt(0) + split[0].charAt(1);

    const color = letterAvatar[index % letterAvatar.length];
    return {
      color,
      letters: letters.toUpperCase(),
    };
  }, []);

  const parseDeliveries = useCallback(
    (data) => {
      return data.map((delivery, index) => {
        delivery.idText =
          delivery.id > 9 ? `#${delivery.id}` : `#0${delivery.id}`;

        delivery.deliveryman.letterAvatar = createLetterAvatar(
          delivery.deliveryman.name,
          index
        );

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
    },
    [createLetterAvatar]
  );

  const handleLook = useCallback((delivery) => {
    setLooking(delivery);
  }, []);

  const handleEdit = useCallback((delivery) => {
    console.tron.log(delivery);
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

  const handleSearch = async (search) => {
    const response = await api.get(`delivery?q=${search}`);
    const data = parseDeliveries(response.data);
    setDeliveries(data);
  };

  useEffect(() => {
    async function getDeliveries() {
      const response = await api.get('delivery');
      const data = parseDeliveries(response.data);
      setDeliveries(data);
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
          {deliveries.map(({ deliveryman, recipient, status, ...delivery }) => (
            <tr key={String(delivery.id)}>
              <td>{delivery.idText}</td>
              <td>{recipient.name}</td>
              <DeliverymanField>
                {deliveryman.avatar ? (
                  <Avatar src={deliveryman.avatar.url} />
                ) : (
                  <LetterAvatar color={deliveryman.letterAvatar.color}>
                    {deliveryman.letterAvatar.letters}
                  </LetterAvatar>
                )}

                {deliveryman.name}
              </DeliverymanField>
              <td>{recipient.city}</td>
              <td>{recipient.state}</td>
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
      </table>

      {looking && (
        <LookDelivery
          delivery={looking}
          closeCallback={() => setLooking(null)}
        />
      )}
    </Container>
  );
}
