export function signInRequest(deliverymanId) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      deliverymanId,
    },
  };
}

export function signInSuccess(profile) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      profile,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
