import React from 'react'
import { Form, Input, Label } from 'semantic-ui-react'

const CurrencyField = ({ input: { value, onChange }, meta: { touched, error }, type, name, placeholder, label }) =>
  <Form.Field>
    <label>{label}</label>
    <Input labelPosition='right' type='text' placeholder='Amount'>
      <Label basic>$</Label>
      <input type={type || 'text'} onChange={onChange} value={value} name={name} placeholder={placeholder || label} />
      {touched && error && <Label basic color='red' pointing>{error}</Label>}
    </Input>
  </Form.Field>

export default CurrencyField
