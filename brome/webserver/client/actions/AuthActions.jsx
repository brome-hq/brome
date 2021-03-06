import axios from 'axios'
import moment from 'moment-timezone'

// ====================================
// Constants
// ====================================

export const UPDATE_SESSION_USER = 'UPDATE_SESSION_USER'
export const AUTH_GETTING_SESSION = 'AUTH_GETTING_SESSION'
export const AUTH_GETTING_SESSION_SUCCESS = 'AUTH_GETTING_SESSION_SUCCESS'
export const AUTH_GETTING_SESSION_ERROR = 'AUTH_GETTING_SESSION_ERROR'
export const AUTH_RESET_SESSION = 'AUTH_RESET_SESSION'
export const AUTH_GETTING_SESSION_REGISTERED = 'AUTH_GETTING_SESSION_REGISTERED'
export const AUTH_GETTING_SESSION_LOGGED_IN = 'AUTH_GETTING_SESSION_LOGGED_IN'

// ====================================
// Logger
// ====================================

const logger = require('loglevel').getLogger('AuthAction')
logger.setLevel(__LOGLEVEL__)

// ====================================
// Actions
// ====================================

export function getSession (loadingContext = false) {
  return dispatch => {
    if (loadingContext) {
      dispatch({type: AUTH_GETTING_SESSION})
    }

    let userTz = moment.tz.guess()
    let data = {
      user_timezone: userTz
    }

    axios.post('/api/get_session', data)
      .then((response) => {
        logger.debug('/api/get_session (response)', response)
        if (response.data.success) {
          dispatch(getSessionSuccess(response.data))
        } else {
          dispatch(getSessionError(response.data))
        }
      })
  }
}

export function updateSessionUser (data) {
  return {
    type: UPDATE_SESSION_USER,
    data
  }
}

export function getSessionSuccess (data) {
  return {
    type: AUTH_GETTING_SESSION_SUCCESS,
    data
  }
}

export function getSessionRegistered (data) {
  return {
    type: AUTH_GETTING_SESSION_REGISTERED,
    data
  }
}

export function getSessionLoggedIn (data) {
  return {
    type: AUTH_GETTING_SESSION_LOGGED_IN,
    data
  }
}

export function getSessionError (data) {
  return {
    type: AUTH_GETTING_SESSION_ERROR,
    data
  }
}

export function resetSession () {
  return {
    type: AUTH_RESET_SESSION
  }
}
