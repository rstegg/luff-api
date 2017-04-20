import { onFetchLuvsSuccess, onFetchSingleLuvSuccess, onEditLuvSuccess, onCreateLuvSuccess } from '../actions/luvs'
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
  createLuv: ({name, description, amount_type, amount, is_public, token}) => {
   const request = su.post(`${API_HOST}/luvs`)
      .send({name, description, amount_type, amount, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  editLuv: ({id, name, description, amount_type, is_public, token}) => {
   const request = su.put(`${API_HOST}/luv/${id}`)
      .send({name, description, amount_type, is_public})
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

export const createLuv = action$ =>
  action$.ofType('CREATE_LUV')
    .mergeMap(action =>
      api.createLuv(action.payload)
        .map(onCreateLuvSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_LUV_FAILURE'
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
