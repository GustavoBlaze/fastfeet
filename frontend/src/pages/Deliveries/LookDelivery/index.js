import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import { Container, Scroll } from './styles';

export default function LookDelivery({ delivery, closeCallback }) {
  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);
    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, [closeCallback]);

  if (!delivery) return <></>;

  const {
    product,
    start_date,
    end_date,
    canceled_at,
    recipient,
    problems,
    signature,
  } = delivery;

  let formattedStart;
  let formattedEnd;
  let formattedCanceled;

  if (start_date) formattedStart = format(parseISO(start_date), 'dd/MM/yyyy');

  if (end_date) formattedEnd = format(parseISO(end_date), 'dd/MM/yyyy');

  if (canceled_at)
    formattedCanceled = format(parseISO(canceled_at), 'dd/MM/yyyy');

  function handleCloseByClick(e) {
    if (e.target.id === 'look-delivery-container') closeCallback();
  }

  return (
    <Container id="look-delivery-container" onClick={handleCloseByClick}>
      <div>
        <Scroll>
          <strong>Informações da encomenda</strong>
          <p>{product}</p>
          <p>{`${recipient?.street}, ${recipient?.number}`}</p>
          <p>{`${recipient?.city} - ${recipient?.state}`}</p>
          <p>{recipient?.zip_code}</p>
          {recipient?.complement && <p>recipient?.complement</p>}

          {(start_date || end_date || canceled_at) && (
            <>
              <hr />
              <strong>Datas</strong>
            </>
          )}

          {formattedStart && (
            <p>
              <span>Retirada:</span> {formattedStart}
            </p>
          )}

          {formattedEnd && (
            <p>
              <span>Entrega:</span> {formattedEnd}
            </p>
          )}

          {formattedCanceled && (
            <p>
              <span>Cancelada:</span> {formattedCanceled}
            </p>
          )}

          {problems.length > 0 && (
            <>
              <hr />
              <strong>Problemas ocorridos</strong>
              {problems.map((problem, i) => (
                <div key={String(i)}>
                  <p>{problem.description}</p>
                  <span>
                    {format(parseISO(problem.createdAt), 'dd/MM/yyyy')}
                  </span>
                </div>
              ))}
            </>
          )}

          {signature && (
            <>
              <hr />
              <strong>Assinatura do destinatário</strong>
              <img src={signature.url} alt="Assinatura" />
            </>
          )}
        </Scroll>
      </div>
    </Container>
  );
}

LookDelivery.propTypes = {
  delivery: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};
