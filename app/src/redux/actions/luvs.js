export const refreshLuvs = () =>
({
  type: 'REFRESH_LUVS'
})

export const shareLuv = ({name, email, message}, user, url) =>
({
  type: 'SHARE_LUV',
  payload: {
    name,
    email,
    message,
    token: user.token,
    url
  }
})

export const onShareLuvSuccess = res =>
({
  type: 'SHARE_LUV_SUCCESS',
  payload: {
    luv: res.body.luv
  }
})

export const setCurrentLuv = luv =>
({
  type: 'SET_CURRENT_LUV',
  payload: {
    luv
  }
})

export const fetchLuvs = user =>
({
  type: 'FETCH_LUVS',
  payload: {
    token: user.token
  }
})

export const onFetchLuvsSuccess = res =>
({
  type: 'FETCH_LUVS_SUCCESS',
  payload: {
    luvs: res.body.luvs
  }
})


export const fetchSingleLuv = (id, user) =>
({
  type: 'FETCH_SINGLE_LUV',
  payload: {
    luvId: id,
    token: user.token
  }
})

export const onFetchSingleLuvSuccess = res =>
({
  type: 'FETCH_SINGLE_LUV_SUCCESS',
  payload: {
    luv: res.body.luv
  }
})

export const createLuv = ({name, description, image, amount, amount_type, is_public}, {token}) =>
({
  type: 'CREATE_LUV',
  payload: {
    name,
    description,
    image,
    amount_type,
    is_public,
    amount,
    token
  }
})

export const onCreateLuvSuccess = res =>
({
  type: 'CREATE_LUV_SUCCESS',
  payload: {
    luv: res.body.luv
  }
})

export const uploadLuvImage = (image, {token}) =>
({
  type: 'UPLOAD_LUV_IMAGE',
  payload: {
    image,
    token
  }
})

export const onUploadLuvImageSuccess = res =>
({
  type: 'UPLOAD_LUV_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editLuv = ({id, name, description, amount_type}, {token}) =>
({
  type: 'EDIT_LUV',
  payload: {
    id,
    name,
    description,
    amount_type,
    token,
  }
})

export const onEditLuvSuccess = res =>
({
  type: 'EDIT_LUV_SUCCESS',
  payload: {
    luv: res.body.luv
  }
})
