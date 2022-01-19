import axios from 'axios'
import store from "../redux/store"
// import jwt from 'jsonwebtoken'

import {
  UPDATE_AUTH_HAS_CUSTOMER,
  UPDATE_AUTH_ACCESS_TOKEN,
  CLEAR_AUTH_ACCESS_TOKEN,
  UPDATE_AUTH_REFRESH_TOKEN,
} from "../redux/constants/checkoutConstants"

// var jwt = require('jsonwebtoken');

const authClient = axios.create({
  baseURL: process.env.GATSBY_APP_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const getAccessToken = () => {
  // store.dispatch(fetchTodos)
  const {
    checkout: { auth },
  } = store.getState()
  let accessToken = auth.access_token

  if (accessToken) {
    decodeAccessToken(accessToken)
    return Promise.resolve(accessToken)
  }

  return authClient
    .post('/oauth/token', {
      grant_type: 'client_credentials',
      client_id: process.env.GATSBY_APP_API_CLIENT_ID
    })
    .then(response => {
      store.dispatch({type: UPDATE_AUTH_ACCESS_TOKEN, payload: response.data.access_token})
      decodeAccessToken(response.data.access_token)
      return response.data.access_token
    })
    .catch(error => {
      console.log('Get access token error:', error.response)
    })
}

const refreshAccessToken = refreshToken => {
  return authClient
    .post('/oauth/token', {
      grant_type: 'refresh_token',
      client_id: process.env.GATSBY_APP_API_CLIENT_ID,
      refresh_token: refreshToken
    })
    .then(response => {
      store.dispatch({type: UPDATE_AUTH_ACCESS_TOKEN, payload: response.data.access_token})
      store.dispatch({type: UPDATE_AUTH_REFRESH_TOKEN, payload: response.data.refresh_token})
      decodeAccessToken(response.data.access_token)
      return response.data.access_token
    })
    .catch(error => {
      console.log('Get access token error:', error.response)
    })
}

const updateAccessToken = () => {
  // store.commit('clearAuthAccessToken')
  store.dispatch({type: CLEAR_AUTH_ACCESS_TOKEN})
  const {
    checkout: { auth },
  } = store.getState()

  let refreshToken = auth.refresh_token
  if (refreshToken) {
    return refreshAccessToken(refreshToken)
  } else {
    return getAccessToken()
  }
}

const decodeAccessToken = accessToken => {
  let decoded = ''; //jwt.decode(accessToken)
  if (decoded) {
    // Verify with shared secret (when available)
    store.dispatch({type: UPDATE_AUTH_HAS_CUSTOMER, payload: !!decoded.owner && decoded.owner.type === 'Customer'})
    // store.commit(
    //   'updateAuthHasCustomer',
    //   !!decoded.owner && decoded.owner.type === 'Customer'
    // )
  }
}

export default {
  getAccessToken,
  updateAccessToken
}
