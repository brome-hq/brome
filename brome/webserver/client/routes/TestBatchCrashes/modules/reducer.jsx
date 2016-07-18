import axios from 'axios'

// ====================================
// Constants
// ====================================

export const LOADED_TEST_BATCH_CRASHES_SUCCESS = 'LOADED_TEST_BATCH_CRASHES_SUCCESS'
export const LOADED_TEST_BATCH_CRASHES_ERROR = 'LOADED_TEST_BATCH_CRASHES_ERROR'

// ====================================
// Actions
// ====================================

const logger = require('loglevel').getLogger('TestBatchCrashes')
logger.setLevel(__LOGLEVEL__)

export function doLoadTestBatchCrashes (session, testBatchUid) {
  return dispatch => {
    let data = {
      token: session.token,
      actions: [
        {
          action: 'read',
          model: 'testcrash',
          filters: {
            'test_batch_id': testBatchUid
          }
        }, {
          action: 'read',
          uid: testBatchUid,
          model: 'testbatch'
        }
      ]
    }

    axios.post('/api/crud', data)
      .then((response) => {
        logger.debug('/api/crud (data) (response)', data, response)

        if (response.data.success) {
          dispatch(loadedTestBatchCrashesSuccess(response.data))
        } else {
          dispatch(loadedTestBatchCrashesError(response.error))
        }
      })
  }
}

function loadedTestBatchCrashesSuccess (data) {
  return {
    type: LOADED_TEST_BATCH_CRASHES_SUCCESS,
    data
  }
}

function loadedTestBatchCrashesError (error) {
  return {
    type: LOADED_TEST_BATCH_CRASHES_ERROR,
    error
  }
}

export const actions = {
  doLoadTestBatchCrashes
}

// ====================================
// Reducers
// ====================================

const initialState = {
  error: null,
  testBatch: null,
  crashes: []
}

export default function testbatchcrashes (state = initialState, action) {
  switch (action.type) {
    case LOADED_TEST_BATCH_CRASHES_SUCCESS:
      return Object.assign({},
        initialState,
        {
          crashes: action.data.results[0].results,
          testBatch: action.data.results[1].results[0],
          loading: false
        }
      )

    case LOADED_TEST_BATCH_CRASHES_ERROR:
      return Object.assign({},
        initialState,
        {
          loading: false,
          error: action.error
        }
      )

    default:
      return state
  }
}
