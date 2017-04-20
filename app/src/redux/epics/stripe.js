import { onCreateStripeCardSuccess, onCreateStripeBankSuccess } from '../actions/stripe'
import { Observable } from 'rxjs/Rx'

const Stripe = window.Stripe

const api = {
  createStripeCard: ({ card: { number, cvc, exp_month, exp_year, address_zip }, user }) => {
    const request =
      Stripe.card.createToken({ number, cvc, exp_month, exp_year, address_zip })
      return Observable.fromCallback(request)
  },
  createStripeBank: ({ bank: { routing_number, account_number, account_holder_name, account_holder_type }, user }) => {
    const { country, currency } = user
    const request =
      Stripe.bankAccount.createToken({ country, currency, routing_number, account_number, account_holder_name, account_holder_type })
    return Observable.fromCallback(request)
  }
}

export const createStripeCard = action$ =>
  action$.ofType('CREATE_STRIPE_CARD')
    .mergeMap(action =>
      api.createStripeCard(action.payload)
        .map((status, response) =>
          onCreateStripeCardSuccess(status, response, action.payload.user)
        )
        .catch(error => Observable.of({
          type: 'CREATE_STRIPE_CARD_FAILURE'
        }))
    )

export const createStripeBank = action$ =>
  action$.ofType('CREATE_STRIPE_BANK')
    .mergeMap(action =>
      api.createStripeBank(action.payload)
        .map((status, response) =>
          onCreateStripeBankSuccess(status, response, action.payload.user)
        )
        .catch(error => Observable.of({
          type: 'CREATE_STRIPE_BANK_FAILURE'
        }))
    )
