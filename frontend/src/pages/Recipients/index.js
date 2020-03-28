import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdEdit, MdDeleteForever } from 'react-icons/md';

import { Container, NameField, LetterAvatar } from './styles';

import { PageTitle } from '~/styles/PageTittle';

import SearchInput from '~/components/SearchInput';
import Actions from '~/components/Actions';
import Table from '~/components/Table';

import api from '~/services/api';

import { createLetterAvatar } from '~/util/letterAvatar';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  const parseRecipients = useCallback((data) => {
    return data.map((item, index) => {
      item.idText = item.id > 9 ? `#${item.id}` : `#0${item.id}`;

      item.letterAvatar = createLetterAvatar(item.name, index);

      item.address = `${item.street}, ${item.number}${
        item.complement ? ` [${item.complement}]` : ``
      }, ${item.city} - ${item.state}`;

      return item;
    });
  }, []);

  const handleSearch = async (search) => {
    const response = await api.get(`recipients?q=${search}`);
    const data = parseRecipients(response.data);
    setRecipients(data);
  };

  const handleEdit = useCallback((item) => {
    console.tron.log(item);
  }, []);

  const handleDelete = useCallback(
    async (item) => {
      // eslint-disable-next-line no-alert
      const gonnaDelete = window.confirm(
        `Tem certeza que deseja excluir o destinatário ${item.idText}?`
      );

      if (!gonnaDelete) return;

      await api.delete(`recipients/${item.id}`);
      toast.info(`O destinatário ${item.idText} foi excluído!`);
      setRecipients(recipients.filter(({ id }) => id !== item.id));
    },
    [recipients]
  );

  useEffect(() => {
    async function getDeliverymen() {
      const response = await api.get('recipients');
      const data = parseRecipients(response.data);
      setRecipients(data);
    }

    getDeliverymen();
  }, [parseRecipients]);

  return (
    <Container>
      <header>
        <PageTitle>Gerenciando destinatários</PageTitle>
      </header>
      <div>
        <SearchInput
          placeholder="Buscar por destinatário"
          callback={handleSearch}
        />
        <Link to="/">
          <MdAdd color="#FFFFFF" size={26} />
          Cadastrar
        </Link>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((item) => (
            <tr key={String(item.id)}>
              <td>{item.idText}</td>

              <NameField>
                <LetterAvatar color={item.letterAvatar.color}>
                  {item.letterAvatar.letters}
                </LetterAvatar>
                {item.name}
              </NameField>
              <td>{item.address}</td>
              <td>
                <Actions>
                  <button type="button" onClick={() => handleEdit(item)}>
                    <MdEdit size={24} color="#4D85EE" />
                    Editar
                  </button>
                  <button type="button" onClick={() => handleDelete(item)}>
                    <MdDeleteForever size={24} color="#DE3B3B" />
                    Excluir
                  </button>
                </Actions>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
