import {
  onFetchLuvsSuccess,
  onFetchSingleLuvSuccess,
  onEditLuvSuccess,
  onCreateLuvSuccess,
  onUploadLuvImageSuccess,
  onUploadFreeLuvImageSuccess,
  onShareLuvSuccess
} from '../actions/luvs'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchLuvs: ({token}) => {
    const request = su.get(`${API_HOST}/luvs`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleLuv: ({luvId, token}) => {
    const request = su.get(`${API_HOST}/luv/${luvId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createLuv: ({name, description, image, amount_type, amount, is_public, token}) => {
   const request = su.post(`${API_HOST}/luvs`)
      .send({name, description, image, amount_type, amount, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  shareLuv: ({name, email, message, token, url}) => {
   const request = su.post(`${API_HOST}/share/luv`)
      .send({name, email, message, token, url})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadLuvImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/luv`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadFreeLuvImage: ({image}) => {
    const request = su.post(`${API_HOST}/image/luv/free`)
      .attach('image', image)
      .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  },
  editLuv: ({id, name, description, image, amount, amount_type, is_public, token}) => {
   const request = su.put(`${API_HOST}/luv/${id}`)
      .send({name, description, image, amount, amount_type, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchLuvs = action$ =>
  action$.ofType('FETCH_LUVS')
    .mergeMap(action =>
      api.fetchLuvs(action.payload)
        .map(onFetchLuvsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_LUVS_FAILURE'
        }))
      )

export const fetchSingleLuv = action$ =>
  action$.ofType('FETCH_SINGLE_LUV')
    .mergeMap(action =>
      api.fetchSingleLuv(action.payload)
        .map(onFetchSingleLuvSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_LUV_FAILURE'
        }))
      )

export const shareLuv = action$ =>
  action$.ofType('SHARE_LUV')
    .mergeMap(action =>
      api.shareLuv(action.payload)
        .map(onShareLuvSuccess)
        .catch(error => Observable.of({
          type: 'SHARE_LUV_FAILURE'
        }))
      )

export const createLuv = action$ =>
  action$.ofType('CREATE_LUV')
    .mergeMap(action =>
      api.createLuv(action.payload)
        .map(onCreateLuvSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_LUV_FAILURE'
        }))
      )

export const uploadLuvImage = action$ =>
  action$.ofType('UPLOAD_LUV_IMAGE')
    .mergeMap(action =>
      api.uploadLuvImage(action.payload)
        .map(onUploadLuvImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_LUV_IMAGE_FAILURE'
        }))
    )

export const uploadFreeLuvImage = action$ =>
  action$.ofType('UPLOAD_FREE_LUV_IMAGE')
    .mergeMap(action =>
      api.uploadFreeLuvImage(action.payload)
        .map(onUploadFreeLuvImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_FREE_LUV_IMAGE_FAILURE'
        }))
    )

export const editLuv = action$ =>
  action$.ofType('EDIT_LUV')
    .mergeMap(action =>
      api.editLuv(action.payload)
        .map(onEditLuvSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_LUV_FAILURE'
        }))
      )
