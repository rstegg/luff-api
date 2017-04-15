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

export const fetchFeedStub = stub =>
({
  type: 'FETCH_FEED_STUB',
  payload: {
    stub
  }
})

export const onFetchFeedStubSuccess = res =>
({
  type: 'FETCH_FEED_STUB_SUCCESS',
  payload: {
    feed: res.body.feed
  }
})
