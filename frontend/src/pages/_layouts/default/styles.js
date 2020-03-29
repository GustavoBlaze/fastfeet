import styled from 'styled-components';

export const Wrapper = styled.div`
  background: #f5f5f5;
  height: 100%;
  flex-direction: column;
  overflow: auto;
`;

export const Content = styled.div`
  margin: 35px auto;
  margin-bottom: 0;
  width: 100%;
  max-width: calc(1440px - 120px * 2);
  padding-left: 10px;
  padding-right: 15px;
  padding-bottom: 130px;
  flex: 1;
`;
