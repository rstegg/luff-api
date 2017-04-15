import { onFetchStubsSuccess, onFetchSingleStubSuccess, onEditStubSuccess, onCreateStubSuccess } from '../actions/stubs'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchStubs: ({token}) => {
    const request = su.get(`${API_HOST}/stubs`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleStub: ({stubId, token}) => {
    const request = su.get(`${API_HOST}/stub/${stubId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createStub: ({name, description, amount_type, is_public, token}) => {
   const request = su.post(`${API_HOST}/stubs`)
      .send({name, description, amount_type, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  editStub: ({id, name, description, amount_type, is_public, token}) => {
   const request = su.put(`${API_HOST}/stub/${id}`)
      .send({name, description, amount_type, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchStubs = action$ =>
  action$.ofType('FETCH_STUBS')
    .mergeMap(action =>
      api.fetchStubs(action.payload)
        .map(onFetchStubsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_STUBS_FAILURE'
        }))
      )

export const fetchSingleStub = action$ =>
  action$.ofType('FETCH_SINGLE_STUB')
    .mergeMap(action =>
      api.fetchSingleStub(action.payload)
        .map(onFetchSingleStubSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_STUB_FAILURE'
        }))
      )

export const createStub = action$ =>
  action$.ofType('CREATE_STUB')
    .mergeMap(action =>
      api.createStub(action.payload)
        .map(onCreateStubSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_STUB_FAILURE'
        }))
      )

export const editStub = action$ =>
  action$.ofType('EDIT_STUB')
    .mergeMap(action =>
      api.editStub(action.payload)
        .map(onEditStubSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_STUB_FAILURE'
        }))
      )
