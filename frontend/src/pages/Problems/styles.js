import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  header {
    margin-bottom: 34px;
  }
`;

export const DescriptionField = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50vw;
  display: block;
`;

export const DeliveryStatus = styled.span`
  color: ${(props) => darken(0.2, props.color)};
  text-transform: uppercase;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 14px;
  display: inline-block;
`;
