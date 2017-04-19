const initialState = {
  current: {},
  new: {},
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_LUVS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.luvs
      })
    case 'CREATE_LUV_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.luv],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'FETCH_SINGLE_LUV_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.luv
      })
    case 'SET_CURRENT_LUV':
      return Object.assign({}, state, {
        current: action.payload.luv
      })
    case 'REFRESH_LUVS':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_LUVS_FAILURE':
    case 'FETCH_SINGLE_LUV_FAILURE':
    case 'CREATE_LUV_FAILURE':
    case 'EDIT_LUV_FAILURE':
    default:
      return state
  }
}
