import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchLuvs, fetchSingleLuv, createLuv, uploadLuvImage, uploadFreeLuvImage, editLuv, deleteLuv, shareLuv } from './luvs'
import { fetchPayments, createPayment } from './payments'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed } from './feed'
import { createStripeCard, createStripeBank } from './stripe'

export default combineEpics(
  createStripeBank,
  createStripeCard,
  fetchFeed,
  fetchLuvs,
  fetchSingleLuv,
  createLuv,
  editLuv,
  deleteLuv,
  shareLuv,
  fetchPayments,
  createPayment,
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  uploadLuvImage,
  uploadFreeLuvImage,
  editProfile,
  fetchProfile,
)
