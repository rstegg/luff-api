export const onSignupSubmit = user =>
({
  type: 'SIGNUP_SUBMIT',
  payload: {
    user
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
