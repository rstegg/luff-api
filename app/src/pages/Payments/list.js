import React from 'react'

import PaymentsItem from '../../elements/PaymentsItem'

const PaymentsList =
({
  payments,
  setCurrentPayment
}) =>
  <div className='menu'>
    <ul>
      {
        payments.length ? payments.map((payment, i) =>
          <PaymentsItem key={`payment-${i}`} payment={payment} onClick={() => setCurrentPayment(payment)} />
        )
        :
        <li>
          No Payments!
        </li>
      }
    </ul>
  </div>

export default PaymentsList
