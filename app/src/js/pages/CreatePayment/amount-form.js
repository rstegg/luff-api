import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate } from './validators'

import AreaField from '../../elements/AreaField'
import CurrencyField from '../../elements/CurrencyField'

import { Form, Button } from 'semantic-ui-react'

const AmountForm = ({handleSubmit, luv}) =>
  <Form onSubmit={handleSubmit}>
    {luv.amount_type === 'fixed' && <Field component={CurrencyField}  name='amount' type='text' label='Amount' value={luv.amount} placeholder={luv.amount} disabled={true} />}
    {luv.amount_type === 'open' && <Field component={CurrencyField} name='amount' type='text' label='Amount' placeholder='0.00' />}
    <Field component={AreaField} name='note' type='text' label='Note' control='input' placeholder='Note' />
    <Button type='submit' primary>Next</Button>
  </Form>

export default reduxForm({
  form: 'newPayment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AmountForm)
