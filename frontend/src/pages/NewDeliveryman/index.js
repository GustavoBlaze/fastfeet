import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { Loading, Form, Button, Card } from './styles';
import { PageTitle } from '~/styles/PageTittle';

import AvatarInput from './AvatarInput';
import Input from '~/components/Input';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  avatar_id: Yup.number(),
  name: Yup.string().required('Este campo é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Este campo é obrigatório'),
});

export default function NewDeliveryman({ match }) {
  const id = match.params.id ? decodeURIComponent(match.params.id) : null;
  const [deliveryman, setDeliveryman] = useState(null);

  useEffect(() => {
    async function getRecipient() {
      try {
        const { data } = await api.get(`deliverymen/${id}`);
        setDeliveryman(data);
      } catch (err) {
        toast.error('Não foi possível localizar este destinatário');
        history.push('/deliverymen');
      }
    }

    if (id) {
      getRecipient();
    }
  }, [id]);

  function handleGoBack() {
    history.push('/deliverymen');
  }

  async function handleSubmit(data) {
    if (id) {
      try {
        await api.put(`deliverymen/${id}`, data);
        toast.success('Entregador editado com sucesso!');
        history.push('/deliverymen');
      } catch (err) {
        toast.error(
          'Não foi possível editar este entregador, verifique seus dados.'
        );
      }
    } else {
      try {
        await api.post('deliverymen', data);
        toast.success('Entregador cadastrado com sucesso!');
        history.push('/deliverymen');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro, verifique seus dados.'
        );
      }
    }
  }

  if (id && !deliveryman) {
    return (
      <Loading>
        <AiOutlineLoading />
      </Loading>
    );
  }

  return (
    <Form
      schema={schema}
      initialData={deliveryman || undefined}
      onSubmit={handleSubmit}
    >
      <header>
        <PageTitle>
          {deliveryman ? 'Editar entregador' : 'Cadastrar entregador'}
        </PageTitle>
        <Button type="button" onClick={handleGoBack}>
          <MdKeyboardArrowLeft size={24} />
          Voltar
        </Button>
        <Button color="#7D40E7" type="submit">
          <MdDone size={24} />
          Salvar
        </Button>
      </header>
      <Card>
        <AvatarInput name="avatar_id" />
        <Input title="nome" name="name" placeholder="João das Neves" />
        <Input
          title="Email"
          name="email"
          type="email"
          placeholder="john@gmail.com"
        />
      </Card>
    </Form>
  );
}

NewDeliveryman.propTypes = {
  match: PropTypes.object.isRequired,
};
