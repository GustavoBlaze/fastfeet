import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import { Container, Scroll } from './styles';

export default function LookProblem({ problem, closeCallback }) {
  useEffect(() => {
    document.addEventListener('keyup', closeCallback, false);
    return () => {
      document.removeEventListener('keyup', closeCallback, false);
    };
  }, [closeCallback]);

  if (!problem) return <></>;

  const {
    product,
    start_date,
    end_date,
    canceled_at,
    recipient,
  } = problem.delivery;

  let formattedStart;
  let formattedCanceled;

  if (start_date) formattedStart = format(parseISO(start_date), 'dd/MM/yyyy');

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
          <p>{`${recipient.street}, ${recipient.number}`}</p>
          <p>{`${recipient.city} - ${recipient.state}`}</p>
          <p>{recipient.zip_code}</p>
          {recipient.complement && <p>recipient.complement</p>}

          {(start_date || end_date || canceled_at) && (
            <>
              <hr />
              <strong>Datas</strong>
            </>
          )}

          {start_date && (
            <p>
              <span>Retirada:</span> {formattedStart}
            </p>
          )}

          {canceled_at && (
            <p>
              <span>Cancelada:</span> {formattedCanceled}
            </p>
          )}

          <hr />
          <strong>Problema</strong>
          <p>{problem.description}</p>
        </Scroll>
      </div>
    </Container>
  );
}

LookProblem.propTypes = {
  problem: PropTypes.object.isRequired,
  closeCallback: PropTypes.func.isRequired,
};
