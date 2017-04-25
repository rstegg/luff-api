import { onFetchFeedSuccess, onFetchFeedLuvSuccess } from '../actions/feed'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchFeed: () => {
    const request =
      su.get(`${API_HOST}/feed`)
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  },
  fetchFeedLuv: ({luv}) => {
    const request =
      su.get(`${API_HOST}/feed/${luv}`)
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

export const fetchFeed = action$ =>
  action$.ofType('FETCH_FEED')
    .switchMap(() =>
      api.fetchFeed()
        .map(onFetchFeedSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_FAILURE'
        }))
    )

export const fetchFeedLuv = action$ =>
  action$.ofType('FETCH_FEED_LUV')
    .mergeMap(action =>
      api.fetchFeedLuv(action.payload)
        .map(onFetchFeedLuvSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_LUV_FAILURE'
        }))
    )
