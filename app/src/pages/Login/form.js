import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { Form } from 'semantic-ui-react'

const InputField = ({ input: { value, onChange }, name, type, label, control, placeholder }) =>
  <Form.Field
    value={value}
    onChange={onChange}
    name={name}
    type={type}
    label={label}
    control={control}
    placeholder={placeholder} />

const LoginForm = ({handleSubmit, isLoading}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="email" type="email" label='Email' control='input' placeholder='Email' />
    <Field component={InputField} name="password" type="password" label='Password' control='input' placeholder='Password' />
    <Form.Button loading={isLoading} type="submit" primary>Log in</Form.Button>
  </Form>

export default reduxForm({
  form: 'login'
})(LoginForm)
