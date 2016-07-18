import React from 'react'
// import { FormattedMessage } from 'react-intl'
import Collapse, { Panel } from 'rc-collapse'
import 'rc-collapse/assets/index.css'

import Loading from 'components/ux/Loading'
import ErrorMsg from 'components/ux/ErrorMsg'
// import ComponentStyle from './ComponentStyle.postcss'
import BaseComponent from 'core/BaseComponent'

// TODO add a pager (maybe?)
class TestBatchCrashes extends BaseComponent {
  constructor (props) {
    super(props)

    this._initLogger()
    this._bind(
      'fetchTestBatchCrashes'
    )
  }

  componentWillMount () {
    this.debug('componentWillMount')
    let testBatchUid = this.props.location.query['testbatchuid']

    this._interval = setInterval(
      () => {
        this.fetchTestBatchCrashes(testBatchUid)
      },
      2000
    )
  }

  componentWillReceiveProps () {
    let testbatchcrashes = this.props.state.testbatchcrashes

    // Clear interval on terminated testbatch
    if (testbatchcrashes.testBatch) {
      if (testbatchcrashes.testBatch.terminated) {
        if (this._interval) {
          clearInterval(this._interval)
          this._interval = null
        }
      }
    }
  }

  componentWillUnmount () {
    this.debug('componentWillUnmount')
    clearInterval(this._interval)
  }

  fetchTestBatchCrashes (testBatchUid) {
    this.props.actions.doLoadTestBatchCrashes(
      this.props.state.session,
      testBatchUid
    )
  }

  render () {
    let testbatchcrashes = this.props.state.testbatchcrashes

    if (!testbatchcrashes.crashes.length) {
      return (
        <div className='container-fluid'>
          <Loading style={{left: '50%'}} />
        </div>
      )
    } else if (testbatchcrashes.error) {
      return <ErrorMsg msgId={testbatchcrashes.error} name='error-test-batch-crashes' />
    } else {
      let testBatch = this.props.state.testbatchcrashes.testBatch
      return (
        <div>
          <h2>Test Batch Crashes <small>({testBatch.friendly_name}) ({testBatch.uid})</small></h2>

          {(() => {
            let crashes = testbatchcrashes.crashes

            return crashes.map((crash, index) => {
              return (
                <div key={index}>
                  <Collapse accordion>
                    <Panel header={crash.title} key={index}>
                      <Collapse accordion>
                        <Panel header='Trace'>
                          <div style={{overflow: 'scroll'}}>
                            <ol>
                              {(() => {
                                return crash.trace.map((line, index) => {
                                  return (
                                    <li key={index}>
                                      <small>
                                        {line}
                                      </small>
                                    </li>
                                  )
                                })
                              })()}
                            </ol>
                          </div>
                        </Panel>
                        <Panel header='Screenshot'>
                          {(() => {
                            if (crash.screenshot_path !== '') {
                              let path = '/test_results/' + crash.screenshot_path
                              return (
                                <a href={path} target='_blank'>
                                  <img className='img-responsive' src={path} />
                                </a>
                              )
                            } else {
                              return (
                                <small>No screenshot</small>
                              )
                            }
                          })()}
                        </Panel>
                        <Panel header='Video Capture'>
                          {(() => {
                            if (crash.videocapture_path !== '') {
                              return (
                                <small>TODO</small>
                              )
                            } else {
                              return (
                                <small>No video capture</small>
                              )
                            }
                          })()}
                        </Panel>
                      </Collapse>
                    </Panel>
                  </Collapse>
                </div>
              )
            })
          })()}
        </div>
      )
    }
  }
}

module.exports = TestBatchCrashes
