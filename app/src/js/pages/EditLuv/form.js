import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Form } from 'semantic-ui-react'

import { validate } from './validators'

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

const EditLuvForm = ({handleSubmit, amountTypeValue}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Name' control='input' placeholder='Luv name' />
    <Field component={AreaField} name='description' type='text' label='Description' control='input' placeholder='Luv descripton'  />
    <Field component={SelectField} name='amount_type' label='Type' placeholder='Type' options={options} />
    {amountTypeValue === 'fixed' && <Field component={CurrencyField} name='amount' label='Amount' placeholder='0.00' />}
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Submit</Form.Button>
  </Form>

const connectedEditLuvForm = reduxForm({
  form: 'editLuv',
  validate
})(EditLuvForm)

const selector = formValueSelector('editLuv')

const mapStateToProps = state =>
({
  amountTypeValue: selector(state, 'amount_type'),
  initialValues: state.luvs.current
})

export default connect(mapStateToProps)(connectedEditLuvForm)
