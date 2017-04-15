const initialState = {
  current: {},
  new: {},
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_STUBS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.stubs
      })
    case 'CREATE_STUB_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.stub],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'FETCH_SINGLE_STUB_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.stub
      })
    case 'SET_CURRENT_STUB':
      return Object.assign({}, state, {
        current: action.payload.stub
      })
    case 'REFRESH_STUBS':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_STUBS_FAILURE':
    case 'FETCH_SINGLE_STUB_FAILURE':
    case 'CREATE_STUB_FAILURE':
    case 'EDIT_STUB_FAILURE':
    default:
      return state
  }
}
