import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

const options = [
  { key: 'us', value: 'US', text: 'United States' },
  { key: 'ca', value: 'CA', text: 'Canada'}
]

const SelectCountry = ({ input: { value, onChange }, options }) =>
  <Form.Select
    options={options}
    value={value}
    onChange={(_,data) => onChange(data.value)}
    placeholder='Country' />

const InputField = ({ input: { value, onChange }, name, type, label, control, placeholder }) =>
  <Form.Field
    value={value}
    onChange={onChange}
    name={name}
    type={type}
    label={label}
    control={control}
    placeholder={placeholder} />


const SignupForm = ({handleSubmit, isLoading}) =>
  <Form onSubmit={handleSubmit}>
    <Form.Group widths='equal'>
      <Field component={InputField} name="first_name" label='First name' control='input' placeholder='First name' />
      <Field component={InputField} name="last_name" label='Last name' control='input' placeholder='Last name' />
    </Form.Group>
    <Field component={InputField} name="email" type="email" label='Email' control='input' placeholder='Email' />
    <Field component={InputField} name="password" type="password" label='Password' control='input' placeholder='Password' />
    <Field component={SelectCountry} name="country" options={options} />
    <Form.Button loading={isLoading} type="submit" primary>Sign up</Form.Button>
  </Form>

export default reduxForm({
  form: 'signup'
})(SignupForm)
