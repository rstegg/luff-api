import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const InputField = ({ input: { value, onChange }, meta: { asyncValidating, touched, error }, name, type, label, control, placeholder }) =>
  <Form.Field>
    <label>{label}</label>
    <div className={asyncValidating ? 'async-validating' : 'field'}>
      <input type={type || 'text'} onChange={onChange} value={value} name={name} placeholder={placeholder || label} />
    </div>
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>


export default InputField
