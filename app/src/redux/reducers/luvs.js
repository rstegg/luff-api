const initialState = {
  current: {},
  new: {
    image: null
  },
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
    case 'UPLOAD_LUV_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: action.payload.image
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
    case 'UPLOAD_LUV_IMAGE_FAILURE':
    default:
      return state
  }
}
