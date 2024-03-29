export const createStripeCard = card =>
({
  type: 'CREATE_STRIPE_CARD',
  payload: {
    card
  }
})

export const onCreateStripeCardSuccess = (card, { payment, user, luvId }) =>
({
  type: 'CREATE_STRIPE_CARD_SUCCESS',
  payload: {
    card,
    payment,
    user,
    luvId
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
