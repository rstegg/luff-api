export const createStripeCard = card =>
({
  type: 'CREATE_STRIPE_CARD',
  payload: {
    card
  }
})

export const onCreateStripeCardSuccess = (status, response) =>
({
  type: 'CREATE_STRIPE_CARD_SUCCESS',
  payload: {
    status,
    response
  }
})

export const createStripeBank = bank =>
({
  type: 'ADD_BANK',
  payload: {
    bank
  }
})

export const onCreateStripeBankSuccess = (status, response) =>
({
  type: 'ADD_BANK_SUCCESS',
  payload: {
    status,
    response
  }
})
