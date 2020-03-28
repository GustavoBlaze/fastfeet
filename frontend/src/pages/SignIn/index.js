import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { AiOutlineLoading } from 'react-icons/ai';

import { signInRequest } from '~/store/modules/auth/actions';
import { Form, Input } from './styles';

import logo from '~/assets/logo.png';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('Este campo é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
      <img src={logo} alt="fastfeet" />

      <strong>Seu e-mail</strong>
      <Input type="email" name="email" placeholder="exemplo@gmail.com" />

      <strong>Sua senha</strong>
      <Input type="password" name="password" placeholder="*************" />

      <button type="submit">
        {loading ? <AiOutlineLoading /> : 'Entrar no sistema'}
      </button>
    </Form>
  );
}
