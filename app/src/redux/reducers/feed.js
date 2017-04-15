const initialState = {
  list: [],
  current: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_FEED_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.feed
      })
    case 'FETCH_FEED_STUB_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.feed
      })
    case 'FETCH_FEED_FAILURE':
    case 'FETCH_FEED_STUB_FAILURE':
    default:
      return state
  }
}
