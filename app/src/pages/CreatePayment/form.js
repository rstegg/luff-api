import React from 'react'

import { Field, reduxForm } from 'redux-form'

import InputField from '../../elements/InputField'
import CurrencyField from '../../elements/CurrencyField'

import { Form, Button } from 'semantic-ui-react'

const CreatePaymentForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Note' control='input' placeholder='Note' />
    <Field component={CurrencyField}  name='amount' type='text' label='Amount' />
    <Button type='submit' primary>Submit</Button>
  </Form>

export default reduxForm({
  form: 'newPayment'
})(CreatePaymentForm)
