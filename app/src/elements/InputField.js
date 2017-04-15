import React from 'react'
import { Form } from 'semantic-ui-react'

const InputField = ({ input: { value, onChange }, name, type, label, control, placeholder }) =>
  <Form.Field
    value={value}
    onChange={onChange}
    name={name}
    type={type || 'text'}
    label={label}
    control={control || 'input'}
    placeholder={placeholder || label} />

export default InputField
