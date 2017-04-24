import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'
import InputField from '../../elements/InputField'

import { validate, asyncValidate } from './validators'

const SignupForm = ({handleSubmit, isLoading}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="name" label='Full name' placeholder='Full name' />
    <Field component={InputField} name="username" label='Username' placeholder='Username' />
    <Field component={InputField} name="email" type="email" label='Email' placeholder='Email' />
    <Field component={InputField} name="password" type="password" label='Password' placeholder='Password' />
    <Form.Button loading={isLoading} type="submit" primary>Sign up</Form.Button>
  </Form>

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: ['username', 'email']
})(SignupForm)
