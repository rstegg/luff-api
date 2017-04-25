import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  current: {},
  new: {
    image: null
  },
  list: [],
  free: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_FREE_LUV':
      return Object.assign({}, state, {
        free: {
          ...action.payload.luv,
          saved: true
        }
      })
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
        },
        free: initialState.free
      })
    case 'UPLOAD_LUV_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        new: {
          ...state.new,
          image: action.payload.image,
        }
      })
    case 'UPLOAD_FREE_LUV_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        free: {
          ...state.free,
          image: action.payload.image,
          saved: true
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
        new: initialState.new,
        free: initialState.free,
      })
    case REHYDRATE:
      return Object.assign({}, state, {
        ...state,
        free: action.payload.luvs.free
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
