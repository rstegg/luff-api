import su from 'superagent'
const API_HOST = '/api/v1'

export const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }
  if (!values.country) {
    errors.country = 'Required'
  }
  return errors
}

export const asyncValidate = (values, dispatch) => {
  return su.post(`${API_HOST}/signup/check_email`)
    .send({ email: values.email })
    .set('Accept', 'application/json')
    .then(res => {
      if(res.body.emailTaken) {
        // eslint-disable-next-line
        throw { email: 'That email is already registerd' }
      }
    })
}
