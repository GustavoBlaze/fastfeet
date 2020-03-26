import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Deliveries} isPrivate />
    </Switch>
  );
}
