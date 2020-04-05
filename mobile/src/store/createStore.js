import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlwares) => {
  const enhancer = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middlwares))
    : applyMiddleware(...middlwares);

  return createStore(reducers, enhancer);
};
