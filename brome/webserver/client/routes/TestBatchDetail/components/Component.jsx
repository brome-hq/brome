import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import 'font-awesome-webpack'
import { Line } from 'rc-progress'
import moment from 'moment'

import LaddaButton from 'components/ux/LaddaButton'
import Modal from 'components/ux/Modal'
import ErrorMsg from 'components/ux/ErrorMsg'
import SuccessMsg from 'components/ux/SuccessMsg'
import Loading from 'components/ux/Loading'
import ComponentStyle from './ComponentStyle.postcss'
import CoreLayoutStyle from 'layouts/CoreLayout/CoreLayoutStyle.postcss'
import BaseComponent from 'core/BaseComponent'

class TestBatchDetail extends BaseComponent {
  constructor (props) {
    super(props)

    this._initLogger()
    this._bind(
      'getModal',
      'closeModal',
      'getTestBatchUid',
      'getTestBatch',
      'getRunningTime',
      'fetchTestBatchDetail',
      'getToolbelt',
      'getTool',
      'onDelete',
      'onTerminate',
      'getActionToolbelt',
      'getProgress',
      'getNotification',
      'getTestResults',
      'getCrashes',
      'getMilestone'
    )

    this.state = {
      showModal: false,
      modalTitle: '',
      modalCb: null
    }
  }

  componentWillMount () {
    this.fetchTestBatchDetail()
  }

  componentWillReceiveProps () {
    let testBatch = this.getTestBatch()

    // Clear interval on terminated testbatch
    if (testBatch) {
      if (testBatch.terminated) {
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
    this.props.actions.doReset()
  }

  closeModal () {
    this.setState({showModal: false, modalCb: null})
  }

  onTerminate () {
    let doTerminate = function () {
      let data = {
        token: this.props.state.session.token,
        actions: {
          action: 'update',
          uid: this.getTestBatchUid(),
          model: 'testbatch',
          data: {
            killed: true
          }
        }
      }

      this.props.actions.doTerminate(data)
      this.closeModal()
    }
    doTerminate = doTerminate.bind(this)
    this.setState({showModal: true, modalCb: doTerminate, modalTitle: 'Are you sure you want to terminate this test batch?'})
  }

  onDelete () {
    let doDelete = function () {
      let data = {
        token: this.props.state.session.token,
        actions: {
          action: 'delete',
          uid: this.getTestBatchUid(),
          model: 'testbatch'
        }
      }
      this.props.actions.doDelete(data)
      this.closeModal()
    }
    doDelete = doDelete.bind(this)
    this.setState({showModal: true, modalCb: doDelete, modalTitle: 'Are you sure you want to delete this test batch?'})
  }

  getModal () {
    return (
      <Modal ref='modal' isOpen={this.state.showModal} onClose={this.closeModal} title={this.state.modalTitle}>
        <button className='btn btn-warning btn-default' onClick={this.state.modalCb}>Yes</button>
        {' '}
        <button className='btn btn-success btn-default' onClick={this.closeModal}>No</button>
      </Modal>
    )
  }

  getRunningTime () {
    let testBatch = this.getTestBatch()

    function pad2 (number) {
      return (number < 10 ? '0' : '') + number
    }
    let startingTimestamp = moment(testBatch.starting_timestamp)
    let endingTimestamp
    if (testBatch.ending_timestamp) {
      endingTimestamp = moment(testBatch.ending_timestamp)
    } else {
      endingTimestamp = Date.now()
    }
    let duration = moment.duration(moment(endingTimestamp).diff(startingTimestamp))
    let hours = parseInt(duration.asHours())
    let minutes = parseInt(duration.asMinutes()) - hours * 60
    let seconds = parseInt(duration.asSeconds()) - hours * 60 - minutes * 60
    let runningDuration = pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds)

    return (
      <div className='row'>
        <center>
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
        </center>
      </div>
    )
  }

  getNotification () {
    let testbatchdetail = this.props.state.testbatchdetail
    if (testbatchdetail.terminatedTestBatchError) {
      return (
        <ErrorMsg msgId='testBatchDetail.TerminatedTestBatchError' />
      )
    } else if (testbatchdetail.terminatedTestBatchSuccess && !this.getTestBatch().terminated) {
      return (
        <SuccessMsg msgId='testBatchDetail.TerminatedTestBatchSuccess' />
      )
    } else if (testbatchdetail.deletedTestBatchError) {
      return (
        <ErrorMsg msgId='testBatchDetail.DeletedTestBatchError' />
      )
    } else if (testbatchdetail.deletedTestBatchSuccess) {
      return (
        <SuccessMsg msgId='testBatchDetail.DeletedTestBatchSuccess' />
      )
    } else {
      return null
    }
  }

  getActionToolbelt () {
    let testbatchdetail = this.props.state.testbatchdetail

    if (testbatchdetail.testBatch[this.getTestBatchUid()].terminated) {
      return (
        <div className={'row ' + CoreLayoutStyle['no-gutter']}>
          <div className='pull-right'>
            <LaddaButton isLoading={testbatchdetail.deletingTestBatch} onClick={this.onDelete}>
              <i className='fa fa-trash-o' aria-hidden='true'></i>
              {' '}
              <FormattedMessage
                id='testBatchDetail.Delete'
                defaultMessage='Delete'
              />
            </LaddaButton>
          </div>
        </div>
      )
    } else {
      return (
        <div className={'row ' + CoreLayoutStyle['no-gutter']}>
          <div className='pull-right'>
            <LaddaButton isLoading={testbatchdetail.terminatingTestBatch} onClick={this.onTerminate}>
              <i className='fa fa-plug' aria-hidden='true'></i>
              {' '}
              <FormattedMessage
                id='testBatchDetail.Terminated'
                defaultMessage='Terminate'
              />
            </LaddaButton>
          </div>
        </div>
      )
    }
  }

  getProgress () {
    if (this.getTestBatch().terminated) {
      return null
    } else {
      let testBatch = this.getTestBatch()
      let totalTests = testBatch.total_tests
      let totalExecutingTests = testBatch.total_executing_tests
      let totalExecutedTests = testBatch.total_executed_tests
      let percent = parseInt(
        (totalExecutedTests / totalTests) * 100
      )
      return (
        <center>
          <span>
            <small>
              <FormattedMessage
                id='testBatchDetail.TotalTests'
                defaultMessage='Total Tests:'
              />
              {' '}
              <b>{totalTests}</b> ~ {' '}
            </small>
          </span>
          <span>
            <small>
              <FormattedMessage
                id='testBatchDetail.TotalExecutedTests'
                defaultMessage='Total Executed Tests:'
              />
              {' '}
              <b>{totalExecutedTests}</b> ~ {' '}
            </small>
          </span>
          <span>
            <small>
              <FormattedMessage
                id='testBatchDetail.TotalExecutingTests'
                defaultMessage='Total Executing Tests:'
              />
              {' '}
              <b>{totalExecutingTests}</b>
            </small>
          </span>
          <Line percent={percent} strokeWidth='2' strokeColor='#87D0E8' />
        </center>
      )
    }
  }

  getTestResults () {
    let testResults = this.getTestBatch().test_results
    let nbFailedTest = testResults['nb_failed_test']
    let nbSucceededTest = testResults['nb_succeeded_test']
    let failedTests = testResults['failed_tests']
    return (
      <div>
        <h3 className={ComponentStyle['section-header']}>
          <FormattedMessage
            id='testBatchDetail.TestResults'
            defaultMessage='Test Results'
          />
          {' '}
          {(() => {
            if (nbFailedTest) {
              return (<span style={{color: 'red'}}>({nbFailedTest})</span>)
            } else {
              return null
            }
          })()}
          {' '}
          {(() => {
            if (nbSucceededTest) {
              return (<span style={{color: 'green'}}>({nbSucceededTest})</span>)
            } else {
              return null
            }
          })()}
        </h3>
        <ul>
          {(() => {
            if (failedTests.length) {
              return failedTests.map((value, index) => {
                return (
                  <li key={index}>
                    <small>
                      {value.title}
                    </small>
                  </li>
                )
              })
            } else {
              return (
                <li>
                  <small>
                    <FormattedMessage
                      id='testBatchDetail.NoTestFailed'
                      defaultMessage='No test failed'
                    />
                  </small>
                </li>
              )
            }
          })()}
        </ul>
      </div>
    )
  }

  getCrashes () {
    let testCrashes = this.getTestBatch().test_crashes
    let nbOfCrashes = testCrashes.length || 0
    let nbOfCrashesStyle = {color: 'green'}
    if (nbOfCrashes) {
      nbOfCrashesStyle = {color: 'red'}
    }
    return (
      <div>
        <h3 className={ComponentStyle['section-header']}>
          <FormattedMessage
            id='testBatchDetail.Crashes'
            defaultMessage='Crashes'
          />
          {' '}
          (<span style={nbOfCrashesStyle}>{nbOfCrashes}</span>):
        </h3>
        <ul>
          {(() => {
            if (testCrashes.length) {
              return testCrashes.map((value, index) => {
                return (
                  <li key={index}>
                    <small>{value['title']}</small>
                  </li>
                )
              })
            } else {
              return (
                <li>
                  <small>
                    <FormattedMessage
                      id='testBatchDetail.NoCrashes'
                      defaultMessage='No crashes'
                    />
                  </small>
                </li>
              )
            }
          })()}
        </ul>
      </div>
    )
  }

  getMilestone () {
    let milestones = this.getTestBatch().milestones
    return (
      <div>
        <h3 className={ComponentStyle['section-header']}>
          <FormattedMessage
            id='testBatchDetail.Milestone'
            defaultMessage='Milestone:'
          />
        </h3>
        <ul>
          {(() => {
            if (milestones.length) {
              return milestones.map((milestone, index) => {
                return (
                  <li key={index}>
                    <small>
                      <FormattedMessage
                        id={'testBatchDetail.' + milestone.msgId}
                        defaultMessage={milestone.msgId}
                        values={milestone.values}
                      />
                    </small>
                  </li>
                )
              })
            } else {
              return (
                <li>
                  <small>
                    <FormattedMessage
                      id='testBatchDetail.NoMilestone'
                      defaultMessage='No milestone'
                    />
                  </small>
                </li>
              )
            }
          })()}
        </ul>
      </div>
    )
  }

  getTool (
    path,
    labelConfig,
    icon,
    enabled,
    extraUrlParam = ''
  ) {
    let className = 'col-xs-12 col-sm-12 col-md-2 col-lg-2'
    return (
      <div className={className}>
        {(() => {
          if (enabled) {
            return (
              <Link className='btn btn-default btn-link' to={path + '?testbatchuid=' + this.getTestBatchUid() + extraUrlParam}>
                <i className={'fa fa-' + icon} aria-hidden='true'></i>
                {' '}
                <FormattedMessage
                  id={labelConfig['id']}
                  defaultMessage={labelConfig['defaultMessage']}
                  values={labelConfig['values']}
                />
              </Link>
            )
          } else {
            return (
              <button className='btn btn-default btn-link' disabled>
                <i className={'fa fa-' + icon} aria-hidden='true'></i>
                {' '}
                <FormattedMessage
                  id={labelConfig['id']}
                  defaultMessage={labelConfig['defaultMessage']}
                  values={labelConfig['values']}
                />
              </button>
            )
          }
        })()}
      </div>
    )
  }

  getToolbelt () {
    let testBatch = this.getTestBatch()
    let testBatchFeatures = testBatch.features
    let sessionVideoCapture = this.getTool(
      'testinstancelist',
      {
        id: 'testBatchDetail.VideoCaptureLabel',
        defaultMessage: 'Video Capture'
      },
      'video-camera',
      testBatchFeatures['session_video_capture'],
      '&path=testinstancevideo'
    )
    let networkCapture = this.getTool(
      'testinstancenetworkcapture',
      {
        id: 'testBatchDetail.NetworkCaptureLabel',
        defaultMessage: 'Network Capture'
      },
      'cubes',
      testBatchFeatures['network_capture']
    )
    let testResults = this.getTool(
      'testbatchtestresults',
      {
        id: 'testBatchDetail.TestResultsLabel',
        defaultMessage: 'Test Results ({nb_test_result})',
        values: {
          nb_test_result: testBatch.test_results.nb_test_result.toString()
        }
      },
      'bar-chart',
      !!testBatch.test_results.nb_test_result
    )
    let testInstances = this.getTool(
      'testinstancedetaillist',
      {
        id: 'testBatchDetail.TestInstanceDetailListLabel',
        defaultMessage: 'Test Instances'
      },
      'list',
      !!testBatch.total_executed_tests || testBatch.total_executing_tests
    )
    let screenshots = this.getTool(
      'browseridslist',
      {
        id: 'testBatchDetail.TestBatchScreenshots',
        defaultMessage: 'Screenshots ({nb_screenshot})',
        values: {
          nb_screenshot: testBatch.nb_screenshot.toString()
        }
      },
      'file-image-o',
      testBatchFeatures['screenshots'],
      '&path=testbatchscreenshots'
    )
    let crashReports = this.getTool(
      'testbatchcrashes',
      {
        id: 'testBatchDetail.TestInstanceCrashesLabel',
        defaultMessage: 'Crash reports ({nb_crashes})',
        values: {
          nb_crashes: testBatch.test_crashes.length.toString()
        }
      },
      'exclamation-triangle',
      !!testBatch.test_crashes.length
    )
    let testInstancesLogs = this.getTool(
      'testinstancelist',
      {
        id: 'testBatchDetail.TestInstanceLogListLabel',
        defaultMessage: 'Instances Logs'
      },
      'newspaper-o',
      !!testBatch.total_executed_tests || testBatch.total_executing_tests,
      '&path=testinstancelog'
    )
    let runnerLog = this.getTool(
      'testbatchrunnerlog',
      {
        id: 'testBatchDetail.TestRunnerLogLabel',
        defaultMessage: 'Runner log'
      },
      'file-text-o',
      true
    )
    /* TODO
    let botDiaries = this.getTool(
      'testinstancelist',
      {
        id: 'testBatchDetail.BotDiariesLabel',
        defaultMessage: 'Bot Diaries'
      },
      'pencil',
      testBatchFeatures['bot_diaries'],
      '&path=testinstancebotdiaries'
    )
    */
    let instanceVnc = this.getTool(
      'testinstancelist',
      {
        id: 'testBatchDetail.VncListLabel',
        defaultMessage: 'Instance VNC'
      },
      'desktop',
      testBatchFeatures['instance_vnc'],
      '&path=testinstancevnc'
    )
    let styleQuality = this.getTool(
      'stylequality',
      {
        id: 'testBatchDetail.StyleQualityLabel',
        defaultMessage: 'Style Quality'
      },
      'eye',
      testBatchFeatures['style_quality']
    )
    return (
      <div className={'row ' + CoreLayoutStyle['no-gutter']}>
        {testResults}
        {crashReports}
        {runnerLog}
        {testInstancesLogs}
        {testInstances}
        {sessionVideoCapture}
        {screenshots}
        {networkCapture}
        {instanceVnc}
        {styleQuality}
      </div>
    )
  }

  fetchTestBatchDetail () {
    this._interval = setInterval(
      () => {
        this.props.actions.doLoadTestBatchDetail(
          this.props.state.session,
          this.getTestBatchUid()
        )
      },
      2000
    )
  }

  getTestBatchUid () {
    return this.props.location.query['testbatchuid']
  }

  getTestBatch () {
    return this.props.state.testbatchdetail.testBatch[this.getTestBatchUid()]
  }

  render () {
    let testBatch = this.getTestBatch()

    if (this.props.state.testbatchdetail.error) {
      return (
        <ErrorMsg msgId={this.props.state.testbatchdetail.error} />
      )
    } else if (testBatch === undefined) {
      return (
        <div className='container-fluid'>
          <Loading style={{left: '50%'}} />
        </div>
      )
    } else if (this.props.state.testbatchdetail.deletedTestBatchSuccess) {
      return (
        <div className='container-fluid'>
          {this.getNotification()}
        </div>
      )
    } else {
      return (
        <div className='container-fluid'>
          {this.getActionToolbelt()}
          {this.getNotification()}
          <h2 className='text-center'>
            <FormattedMessage
              id='testBatchDetail.HeaderTitle'
              defaultMessage='Test Batch Details'
            />
            <small> ({testBatch.friendly_name}) ({testBatch.uid})</small>
          </h2>
          {this.getRunningTime()}
          {this.getProgress()}
          {this.getToolbelt()}
          {this.getTestResults()}
          {this.getMilestone()}
          {this.getCrashes()}
          {this.getModal()}
        </div>
      )
    }
  }
}

module.exports = TestBatchDetail
