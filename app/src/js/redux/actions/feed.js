export const fetchFeed = () =>
({
  type: 'FETCH_FEED'
})

export const onFetchFeedSuccess = res =>
({
  type: 'FETCH_FEED_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})

export const fetchFeedLuv = luv =>
({
  type: 'FETCH_FEED_LUV',
  payload: {
    luv
  }
})

export const onFetchFeedLuvSuccess = res =>
({
  type: 'FETCH_FEED_LUV_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})
