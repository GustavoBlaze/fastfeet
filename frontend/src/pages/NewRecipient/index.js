import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { AiOutlineLoading } from 'react-icons/ai';
import { Loading, Form, Button, Card } from './styles';
import { PageTitle } from '~/styles/PageTittle';

import Input from '~/components/Input';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Este campo é obrigatório'),
  street: Yup.string().required('Este campo é obrigatório'),
  number: Yup.number('Somente numeros')
    .typeError('Este campo é obrigatório')
    .required('Este campo é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('Este campo é obrigatório'),
  state: Yup.string().required('Este campo é obrigatório'),
  zip_code: Yup.string()
    .matches(/^(\d{5})-(\d{3})$/, {
      message: 'Formato incorreto',
      excludeEmptyString: true,
    })
    .required('Este campo é obrigatório'),
});

export default function NewRecipient({ match }) {
  const id = match.params.id ? decodeURIComponent(match.params.id) : null;
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    async function getRecipient() {
      try {
        const { data } = await api.get(`recipients/${id}`);
        setRecipient(data);
      } catch (err) {
        toast.error('Não foi possível localizar este destinatário');
        history.push('/recipients');
      }
    }

    if (id) {
      getRecipient();
    }
  }, [id]);

  function handleGoBack() {
    history.push('/recipients');
  }

  async function handleSubmit(data) {
    if (id) {
      try {
        await api.put(`recipients/${id}`, data);
        toast.success('Destinatário alterado com sucesso!');
        history.push('/recipients');
      } catch (err) {
        toast.error(
          'Não foi possível realizar a alteração, verifique seus dados'
        );
      }
    } else {
      try {
        await api.post('recipients', data);
        toast.success('Destinatário cadastrado com sucesso!');
        history.push('/recipients');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro, verifique seus dados'
        );
      }
    }
  }

  if (id && !recipient) {
    return (
      <Loading>
        <AiOutlineLoading />
      </Loading>
    );
  }
  return (
    <Form
      schema={schema}
      initialData={recipient || undefined}
      onSubmit={handleSubmit}
    >
      <header>
        <PageTitle>Cadastro de destinatário</PageTitle>
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
        <Input title="Nome" name="name" placeholder="Ex: João das Neves" />
        <Input
          title="Rua"
          name="street"
          placeholder="Ex: Avenida mar estreito"
        />
        <Input title="Número" name="number" placeholder="Ex: 205" />
        <Input
          title="Complemento"
          name="complement"
          placeholder="Ex: Casa dos lobos"
        />
        <Input title="Cidade" name="city" placeholder="Ex: Winterfell" />
        <Input title="Estado" name="state" placeholder="Ex: São Paulo" />
        <InputMask
          name="zip_code"
          mask="99999-999"
          value={recipient?.zip_code || undefined}
        >
          {() => (
            <Input title="CEP" name="zip_code" placeholder="Ex: 09960-580" />
          )}
        </InputMask>
      </Card>
    </Form>
  );
}

NewRecipient.propTypes = {
  match: PropTypes.object.isRequired,
};
