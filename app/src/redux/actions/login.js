export const onLoginSubmit = ({email, password}) =>
({
  type: 'LOGIN_SUBMIT',
  payload: {
    email,
    password
  }
})

export const onLoginSuccess = res =>
({
  type: 'LOGIN_SUCCESS',
  payload: {
    user: res.body.user,
    token: res.body.token
  }
})
