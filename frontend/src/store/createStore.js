import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlwares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlwares))
      : applyMiddleware(...middlwares);

  return createStore(reducers, enhancer);
};
