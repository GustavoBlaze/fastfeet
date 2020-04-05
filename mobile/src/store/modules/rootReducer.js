import { combineReducers } from 'redux';

import auth from './auth/reducer';
import deliveryman from './deliveryman/reducer';

export default combineReducers({ auth, deliveryman });
