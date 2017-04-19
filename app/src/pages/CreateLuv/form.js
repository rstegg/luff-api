import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'
import SelectField from '../../elements/SelectField'
import CurrencyField from '../../elements/CurrencyField'

const options = [
  { key: 'fixed', value: 'fixed', text: 'Fixed' },
  { key: 'open', value: 'open', text: 'Open' }
]

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const CreateLuvForm = ({handleSubmit, amountTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Luv name' />
    <Field component={AreaField} name='description' label='Description' placeholder='Luv descripton'  />
    <Field component={SelectField} name='amount_type' label='Type' placeholder='Type' options={options} />
    {amountTypeValue === 'fixed' && <Field component={CurrencyField} name='amount' label='Amount' placeholder='0.00' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedCreateLuvForm = reduxForm({
  form: 'newLuv'
})(CreateLuvForm)

const selector = formValueSelector('newLuv')

const mapStateToProps = state =>
({
  amountTypeValue: selector(state, 'amount_type')
})

export default connect(mapStateToProps)(connectedCreateLuvForm)
