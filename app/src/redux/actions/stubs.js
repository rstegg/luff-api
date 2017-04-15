export const refreshStubs = () =>
({
  type: 'REFRESH_STUBS'
})

export const fetchStubs = user =>
({
  type: 'FETCH_STUBS',
  payload: {
    token: user.token
  }
})

export const onFetchStubsSuccess = res =>
({
  type: 'FETCH_STUBS_SUCCESS',
  payload: {
    stubs: res.body.stubs
  }
})

export const fetchSingleStub = (id, user) =>
({
  type: 'FETCH_SINGLE_STUB',
  payload: {
    stubId: id,
    token: user.token
  }
})

export const onFetchSingleStubSuccess = res =>
({
  type: 'FETCH_SINGLE_STUB_SUCCESS',
  payload: {
    stub: res.body.stub
  }
})

export const createStub = ({name, description, amount_type, is_public}, {token}) =>
({
  type: 'CREATE_STUB',
  payload: {
    name,
    description,
    amount_type,
    is_public,
    token
  }
})

export const onCreateStubSuccess = res =>
({
  type: 'CREATE_STUB_SUCCESS',
  payload: {
    stub: res.body.stub
  }
})

export const editStub = ({id, name, description, amount_type}, {token}) =>
({
  type: 'EDIT_STUB',
  payload: {
    id,
    name,
    description,
    amount_type,
    token,
  }
})

export const onEditStubSuccess = res =>
({
  type: 'EDIT_STUB_SUCCESS',
  payload: {
    stub: res.body.stub
  }
})

export const setCurrentStub = stub =>
({
  type: 'SET_CURRENT_STUB',
  payload: {
    stub
  }
})
