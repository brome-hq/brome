import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { FormattedTime, FormattedDate, FormattedMessage } from 'react-intl'
import moment from 'moment'
import Collapse, { Panel } from 'rc-collapse'
import 'rc-collapse/assets/index.css'

// import ComponentStyle from './ComponentStyle.postcss'
import Breadcrumbs from 'components/ux/Breadcrumbs'
import BrowserBadge from 'components/ux/BrowserBadge'
import ErrorMsg from 'components/ux/ErrorMsg'
import Pager from 'components/ux/Pager'
import Loading from 'components/ux/Loading'
import BaseComponent from 'core/BaseComponent'

const TEST_INSTANCE_LIMIT = 10

class TestInstanceDetailList extends BaseComponent {
  constructor (props) {
    super(props)

    this._initLogger()
    this._bind(
      'pad2',
      'getTestBatch',
      'getTestBatchUid',
      'fetchTestInstanceDetailList'
    )
  }

  componentWillMount () {
    this.debug('componentWillUnmount')

    this.fetchTestInstanceDetailList(0)
  }

  fetchTestInstanceDetailList (skip) {
    this.props.actions.doFetchTestInstanceDetailList(
      this.props.state.session,
      this.getTestBatchUid(),
      skip,
      TEST_INSTANCE_LIMIT
    )
  }

  getTestBatchUid () {
    return this.props.location.query['testbatchuid']
  }

  getTestBatch () {
    return this.props.state.testinstancedetaillist.testBatch
  }

  pad2 (number) {
    return (number < 10 ? '0' : '') + number
  }

  render () {
    let testinstancedetaillist = this.props.state.testinstancedetaillist

    if (testinstancedetaillist.error) {
      return <ErrorMsg msgId={testinstancedetaillist.error} />
    } else if (testinstancedetaillist.testInstanceDetailList === null) {
      return (
        <div className='container-fluid'>
          <Loading style={{left: '50%'}} />
        </div>
      )
    } else {
      let testInstances = this.props.state.testinstancedetaillist.testInstanceDetailList
      let testBatch = this.getTestBatch()
      let routes = [
        {
          msgId: 'TestBatchDetail',
          to: '/testbatchdetail?testbatchuid=' + testBatch.uid
        },
        {
          msgId: 'TestInstanceDetailList',
          disable: true
        }
      ]

      return (
        <div>
          <Breadcrumbs routes={routes} />
          <h2 className='text-center'>
            Test Instance List <small> ({testBatch.friendly_name}) ({testBatch.uid})</small>
          </h2>
          <ul>
          {(() => {
            return testInstances.map((testInstance, index) => {
              let title = <div style={{top: '-40px'}} className='text-ellipsis'>
                <i className='fa fa-sticky-note-o' aria-hidden='true'></i>
                {' '}
                {testInstance.name}
                <BrowserBadge
                  browserName={testInstance.browser_capabilities.browserName}
                  browserIcon={testInstance.browser_capabilities.browserName}
                  browserVersion={testInstance.browser_capabilities.version}
                  platform={testInstance.browser_capabilities.platform}
                />
              </div>
              let startingTimestamp = moment(testInstance.starting_timestamp)
              let endingTimestamp
              if (testInstance.ending_timestamp) {
                endingTimestamp = moment(testInstance.ending_timestamp)
              } else {
                endingTimestamp = Date.now()
              }
              let duration = moment.duration(moment(endingTimestamp).diff(startingTimestamp))
              let hours = parseInt(duration.asHours())
              let minutes = parseInt(duration.asMinutes()) - hours * 60
              let seconds = parseInt(duration.asSeconds()) - hours * 60 - minutes * 60
              let runningDuration = this.pad2(hours) + ':' + this.pad2(minutes) + ':' + this.pad2(seconds)
              return (
                <div key={index}>
                  <Collapse accordion>
                    <Panel header={title} key={index}>
                      <Collapse accordion>
                        <Panel header='Execution Time'>
                          <p>
                            <small>
                              <b>
                                <FormattedMessage
                                  id='testBatchList.StartedTimestamp'
                                  defaultMessage='Started:'
                                />
                              </b>
                              {' '}
                              <FormattedDate
                                value={startingTimestamp}
                                year='numeric'
                                month='long'
                                day='2-digit'
                              />
                              {' '}
                              <FormattedTime value={startingTimestamp} />
                            </small>
                          </p>
                          {(() => {
                            if (testInstance.ending_timestamp) {
                              return (
                                <div>
                                  <p>
                                    <small>
                                      <b>
                                        <FormattedMessage
                                          id='testBatchList.EndingTimtestamp'
                                          defaultMessage='Ended:'
                                        />
                                      </b>
                                      {' '}
                                      <FormattedDate
                                        value={endingTimestamp}
                                        year='numeric'
                                        month='long'
                                        day='2-digit'
                                      />
                                      {' '}
                                      <FormattedTime value={endingTimestamp} />
                                    </small>
                                  </p>
                                  <p>
                                    <small>
                                      <b>
                                        <FormattedMessage
                                          id='testBatchList.TotalDuration'
                                          defaultMessage='Total duration:'
                                        />
                                      </b>
                                      {' '}
                                      {runningDuration}
                                    </small>
                                  </p>
                                </div>
                              )
                            } else {
                              return (
                                <div>
                                  <p>
                                    <small><i>
                                      <FormattedMessage
                                        id='testBatchList.IsRunning'
                                        defaultMessage='is running...'
                                      />
                                    </i></small>
                                  </p>
                                  <p>
                                    <small>
                                      <b>
                                        <FormattedMessage
                                          id='testBatchList.TotalDuration'
                                          defaultMessage='Total duration:'
                                        />
                                      </b>
                                      {' '}
                                      {runningDuration}
                                    </small>
                                  </p>
                                </div>
                              )
                            }
                          })()}
                        </Panel>
                        <Panel header='Extra Info'>
                          <ul>
                              {(() => {
                                if (Object.keys(testInstance.extra_data).length) {
                                  return Object.keys(testInstance.extra_data).map((key, index) => {
                                    return (
                                      <li>{key}{': '}{testInstance.extra_data[key]}</li>
                                    )
                                  })
                                } else {
                                  return (
                                    <li>No extra info</li>
                                  )
                                }
                              })()}
                          </ul>
                        </Panel>
                      </Collapse>
                    </Panel>
                  </Collapse>
                </div>
              )
            })
          })()}
          </ul>
          <Pager
            skippedItem={testinstancedetaillist.skip}
            fetchData={this.fetchTestInstanceDetailList}
            totalItem={testinstancedetaillist.totalTestInstance}
            itemPerPage={TEST_INSTANCE_LIMIT}
          />
        </div>
      )
    }
  }

}

module.exports = TestInstanceDetailList
