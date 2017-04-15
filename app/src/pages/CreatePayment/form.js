import React from 'react'

import { Field, reduxForm } from 'redux-form'

import InputField from '../../elements/InputField'
import CurrencyInput from 'react-currency-input'

import { Form, Button } from 'semantic-ui-react'

const FixedInput = ({ input: { value, onChange } }) =>
  <Form.Field>
    <CurrencyInput prefix="$" value={value} onChange={onChange} placeholder="$0.00" />
  </Form.Field>

const CreatePaymentForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Note' control='input' placeholder='Send a note!' />
    <Field component={FixedInput}  name='amount' type='text' label='Description' control='input' placeholder='Stub descripton'  />
    <Button type='submit' primary>Submit</Button>
  </Form>

export default reduxForm({
  form: 'newPayment'
})(CreatePaymentForm)
