export const onSignupSubmit = ({email, password, first_name, last_name, country}) =>
({
  type: 'SIGNUP_SUBMIT',
  payload: {
    email,
    password,
    first_name,
    last_name,
    country
  }
})

export const onSignupSuccess = res =>
({
  type: 'SIGNUP_SUCCESS',
  payload: {
    registered: true
  }
})

export const resetSignup = () =>
({
  type: 'RESET_SIGNUP'
})
