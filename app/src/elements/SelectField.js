import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const SelectField = ({ input: { value, onChange }, meta: { asyncValidating, touched, error }, label, placeholder, options }) =>
  <Form.Field>
    <label>{label}</label>
    <Form.Select
      options={options}
      value={value}
      onChange={(_,data) => onChange(data.value)}
      placeholder={placeholder} />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

export default SelectField
