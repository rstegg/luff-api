import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchLuvs, fetchSingleLuv, createLuv, uploadLuvImage, editLuv } from './luvs'
import { fetchPayments, createPayment } from './payments'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed, fetchFeedLuv } from './feed'
import { createStripeCard, createStripeBank } from './stripe'

export default combineEpics(
  createStripeBank,
  createStripeCard,
  fetchFeed,
  fetchFeedLuv,
  fetchLuvs,
  fetchSingleLuv,
  createLuv,
  editLuv,
  fetchPayments,
  createPayment,
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  uploadLuvImage,
  editProfile,
  fetchProfile,
)
