export const refreshLuvs = () =>
({
  type: 'REFRESH_LUVS'
})

export const saveFreeLuv = luv =>
({
  type: 'SAVE_FREE_LUV',
  payload: {
    luv
  }
})

export const shareLuv = ({name, email, message, luvId}, user, url) =>
({
  type: 'SHARE_LUV',
  payload: {
    name,
    email,
    message,
    luvId,
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

export const deleteLuv = (id, user) =>
({
  type: 'DELETE_LUV',
  payload: {
    id,
    token: user.token
  }
})

export const onDeleteLuvSuccess = res =>
({
  type: 'DELETE_LUV_SUCCESS',
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

export const uploadFreeLuvImage = image =>
({
  type: 'UPLOAD_FREE_LUV_IMAGE',
  payload: {
    image
  }
})

export const onUploadFreeLuvImageSuccess = res =>
({
  type: 'UPLOAD_FREE_LUV_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editLuv = ({id, name, description, image, amount, amount_type, is_public}, {token}) =>
({
  type: 'EDIT_LUV',
  payload: {
    id,
    name,
    description,
    image,
    amount,
    amount_type,
    is_public,
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
