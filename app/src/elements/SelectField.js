import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const SelectField = ({ input: { value, onChange }, meta: { asyncValidating, touched, error }, label, placeholder, options }) =>
  <Form.Field>
    <label>{label}</label>
    {options.map(option =>
    <Form.Field>
      <Form.Radio
        label={option.text}
        name='selectGroup'
        value={option.value}
        onChange={(_,data) => onChange(data.value)}
        checked={option.value === value}
      />
    </Form.Field>
    )}
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

export default SelectField
