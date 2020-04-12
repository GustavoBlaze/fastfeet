import React, { useEffect, useState, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { AiOutlineLoading } from 'react-icons/ai';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Loading, Form, Button, Card } from './styles';
import { PageTitle } from '~/styles/PageTittle';

import Input from '~/components/Input';
import Select from '~/components/Select';

import history from '~/services/history';
import api from '~/services/api';

export default function NewDelivery({ match }) {
  const { id } = match.params;

  const [delivery, setDelivery] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [deliverymen, setDeliverymen] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [recipientResponse, deliverymanResponse] = await Promise.all([
          api.get('recipients', { params: { limit: 300 } }),
          api.get('deliverymen', { params: { limit: 300 } }),
        ]);

        setRecipients(recipientResponse.data.items);
        setDeliverymen(deliverymanResponse.data.items);

        if (id) {
          const { data } = await api.get(`delivery/${id}`);
          setDelivery(data);
          setSelectedRecipient(data.recipient);
          setSelectedDeliveryman(data.deliveryman);
        }
      } catch (err) {
        toast.error('Falha ao carregar dados');
      }
    }

    loadData();
  }, [id]);

  const recipientsOptions = useMemo(() => {
    return recipients.map((recipient) => ({
      value: recipient,
      label: recipient.name,
    }));
  }, [recipients]);

  const deliverymenOptions = useMemo(() => {
    return deliverymen.map((deliveryman) => ({
      value: deliveryman,
      label: deliveryman.name,
    }));
  }, [deliverymen]);

  const handleChangeRecipient = (selectedOption) => {
    const { value } = selectedOption;

    setSelectedRecipient(value);
  };

  const handleChangeDeliveryman = (selectedOption) => {
    const { value } = selectedOption;
    setSelectedDeliveryman(value);
  };

  function handleGoBack() {
    history.push('/deliveries');
  }

  async function handleSubmit(data) {
    if (!selectedRecipient || !selectedDeliveryman || !data.product) {
      toast.error('Preencha todo o formulário');
      return;
    }

    data.recipient_id = selectedRecipient.id;
    data.deliveryman_id = selectedDeliveryman.id;

    if (id) {
      try {
        await api.put(`delivery/${id}`, data);
        toast.success('Encomenda atualizada com sucesso!');
        history.push('/deliveries');
      } catch (err) {
        toast.error(
          'Não foi possível atualizar a encomenda. Verifique seus dados.'
        );
      }
    } else {
      try {
        await api.post('delivery', data);
        toast.success('Encomenda cadastrada com sucesso!');
        history.push('/deliveries');
      } catch (err) {
        toast.error(
          'Não foi possível realizar o cadastro. Verifique seus dados.'
        );
      }
    }
  }

  if (id && !delivery) {
    return (
      <Loading>
        <AiOutlineLoading />
      </Loading>
    );
  }
  return (
    <Form onSubmit={handleSubmit} initialData={delivery || undefined}>
      <header>
        <PageTitle>
          {delivery ? 'Editar encomenda' : 'Cadastrar encomenda'}
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
        <Select
          name="recipient.name"
          label="Destinatário"
          placeholder="Selecione um destinatário"
          options={recipientsOptions}
          defaultValue={
            delivery
              ? {
                  value: delivery.recipient.id,
                  label: delivery.recipient.name,
                }
              : undefined
          }
          onChange={handleChangeRecipient}
        />
        <Select
          name="deliveryman.name"
          label="Entregador"
          placeholder="Selecione um entregador"
          options={deliverymenOptions}
          defaultValue={
            delivery
              ? {
                  value: delivery.deliveryman.id,
                  label: delivery.deliveryman.name,
                }
              : undefined
          }
          onChange={handleChangeDeliveryman}
        />

        <Input name="product" title="Nome do produto" placeholder="Ex: Livro" />
      </Card>
    </Form>
  );
}

NewDelivery.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
};
