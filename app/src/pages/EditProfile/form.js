import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import InputField from '../../elements/InputField'
import { Form } from 'semantic-ui-react'

import AreaField from '../../elements/AreaField'
import SelectField from '../../elements/SelectField'
import MaskedInput from 'react-maskedinput'

import { validate } from './validators'

const options = [
  { key: 'US', value: 'US', text: 'United States' },
  { key: 'CA', value: 'CA', text: 'Canada' }
]

const DobField = ({ input: { value, onChange } }) =>
  <Form.Input
    label='Date of Birth'
    placeholder='MM/DD/YYYY'
    control={MaskedInput}
    mask='11/11/1111'
    value={value}
    onChange={onChange} />

const EditProfileForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} label='First Name' name='first_name' placeholder='First Name' />
    <Field component={InputField} label='Last Name' name='last_name' />
    <Field component={AreaField} label='Bio' name='bio' />
    <Field component={DobField} name='dob' />
    <Field component={SelectField} name='country' label='Country' placeholder='Country' options={options} />
    <Form.Button type='submit' primary>Save</Form.Button>
  </Form>

const connectedEditProfileForm = reduxForm({
  form: 'editProfile',
  validate
})(EditProfileForm)

const mapStateToProps = ({user}) =>
({
  initialValues: user
})

export default connect(mapStateToProps)(connectedEditProfileForm)
