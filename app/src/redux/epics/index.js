import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchStubs, fetchSingleStub, createStub } from './stubs'
import { fetchPayments, createPayment } from './payments'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed, fetchFeedStub } from './feed'

export default combineEpics(
  fetchFeed,
  fetchFeedStub,
  fetchStubs,
  fetchSingleStub,
  createStub,
  fetchPayments,
  createPayment,
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  editProfile,
  fetchProfile,
)
