import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import {
  Container,
  Header,
  HeaderTitle,
  FilterContainer,
  FilterButton,
  FilterText,
  List,
  Loading,
} from './styles';

import api from '~/services/api';

import DeliveryCard from '~/components/DeliveryCard';

export default function ListDeliveries() {
  const [filter, setFilter] = useState('pending');
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const id = useSelector((store) => store.deliveryman.profile.id);

  function parseDeliveries(items) {
    return items.map((delivery) => ({
      ...delivery,
      formattedId: delivery.id < 10 ? `0${delivery.id}` : String(delivery.id),
      formattedDate: format(parseISO(delivery.createdAt), 'MM/dd/yyyy'),
    }));
  }

  useEffect(() => {
    async function loadDeliveries() {
      setLoading(true);
      try {
        let url = `deliveryman/${id}/deliveries`;
        if (filter === 'delivered') url += '?completed=true';

        const { data } = await api.get(url);
        setDeliveries(parseDeliveries(data));
      } catch (err) {
        Alert.alert(
          'Falha na requisição',
          'Não foi possível buscar as entregas, por favor tente mais tarde.'
        );
      }
      setLoading(false);
    }

    setDeliveries([]);
    loadDeliveries();
  }, [id, filter]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Entregas</HeaderTitle>
        <FilterContainer>
          <FilterButton onPress={() => setFilter('pending')}>
            <FilterText selected={filter === 'pending'}>Pendentes</FilterText>
          </FilterButton>
          <FilterButton onPress={() => setFilter('delivered')}>
            <FilterText selected={filter === 'delivered'}>Entregues</FilterText>
          </FilterButton>
        </FilterContainer>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <List
          data={deliveries}
          keyExtractor={(delivery) => String(delivery.id)}
          renderItem={({ item }) => <DeliveryCard delivery={item} />}
        />
      )}
    </Container>
  );
}
