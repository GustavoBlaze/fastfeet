import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Deliverymen from '~/pages/Deliverymen';
import Recipients from '~/pages/Recipients';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} locationName="" />
      <Route
        path="/deliveries"
        component={Deliveries}
        isPrivate
        locationName="deliveries"
      />
      <Route
        path="/deliverymen"
        component={Deliverymen}
        isPrivate
        locationName="deliverymen"
      />
      <Route
        path="/recipients"
        component={Recipients}
        isPrivate
        locationName="recipients"
      />
      <Route
        path="/problems"
        component={Problems}
        isPrivate
        locationName="problems"
      />
    </Switch>
  );
}
