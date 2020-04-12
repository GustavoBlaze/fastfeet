import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;
    transition: opacity 300ms;
    &:hover {
      opacity: 0.7;
    }

    img,
    div {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 1px dashed #dddddd;
      background: transparent;
      object-fit: cover;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      svg {
        color: #dddddd;
        width: 40px;
        height: 40px;
      }

      strong {
        color: #dddddd;
        font-size: 16px;
      }
    }

    input {
      display: none;
    }
  }
`;
