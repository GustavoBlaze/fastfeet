import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage: AsyncStorage,
      whitelist: ['auth', 'deliveryman'],
    },
    reducers
  );

  return persistedReducer;
};
