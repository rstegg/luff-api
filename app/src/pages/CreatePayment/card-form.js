import React from 'react'

import { Field, reduxForm } from 'redux-form'

import InputField from '../../elements/InputField'
import MaskedInput from 'react-maskedinput'

import { Form, Button } from 'semantic-ui-react'

const ExpiryField = ({ input: { value, onChange } }) =>
  <Form.Input
    label='Expiry'
    placeholder='MM/YY'
    control={MaskedInput}
    mask='11/11'
    value={value}
    onChange={onChange} />

const NumberField = ({ input: { value, onChange } }) =>
  <Form.Input
    label='Card number'
    placeholder='****-****-****-****'
    control={MaskedInput}
    mask='1111-1111-1111-1111'
    value={value}
    onChange={onChange} />

const CardForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="name" label='Name on card' control='input' placeholder='Full name' />
    <Field component={NumberField} name="number" label='Card Number' control='input' placeholder='Number' />
    <Form.Group widths='equal'>
      <Field component={ExpiryField} name="expiry" control='input' placeholder='' />
      <Field component={InputField} name="cvc" label='Password' control='input' placeholder='Password' />
    </Form.Group>
    <Field component={InputField} name="address_zip" label="Zip" placeholder="Zip code" />
    <Button type='submit' primary>Next</Button>
  </Form>

export default reduxForm({
  form: 'newPayment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(CardForm)
