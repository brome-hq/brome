import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'

import './global.css'
import GrowlNotification from 'components/ux/GrowlNotification'
import CoreLayoutStyle from './CoreLayoutStyle.postcss'
import BaseComponent from 'core/BaseComponent'
import Loading from 'components/ux/Loading'
import AuthenticatedNav from 'components/AuthenticatedNav'
import UnAuthenticatedNav from 'components/UnAuthenticatedNav'
import Home from 'components/Home'
import LocalesMenu from 'locales/LocalesMenu'
import * as AuthActions from 'actions/AuthActions'

function mapStateToProps (state) {
  return {
    state
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(AuthActions, dispatch)
  }
}

class CoreLayout extends BaseComponent {

  constructor (props, context) {
    super(props, context)

    this._initLogger()
  }

  componentDidMount () {
    this.debug('componentDidMount')

    this.props.actions.getSession(false)
    // window.setInterval(() => this.props.actions.getSession(false), __GET_SESSION_INTERVAL__)
  }

  render () {
    this.debug('render')

    if (this.props.state.session.loading) {
      return <Loading />
    } else {
      let Nav
      if (this.props.state.session.user) {
        Nav = <AuthenticatedNav />
      } else {
        Nav = <UnAuthenticatedNav />
      }

      return (
        <div>
          <GrowlNotification notifications={this.props.state.session.notifications} />
          {Nav}
          <div className='container'>
            <div className={'jumbotron ' + CoreLayoutStyle['jumbotron']}>
                {this.props.children || <Home />}
            </div>
          </div>
          <footer >
            <div className='container'>
              <div className='jumbotron'>
                <h2>
                  <a href='https://github.com/jf-parent/brome' target='_blank'>Brome</a>
                  {' '}
                  <FormattedMessage
                    id='footer.Webserver'
                    defaultMessage='Webserver'
                  />
                </h2>
              </div>
            </div>
          </footer>
          <div className='container'>
            <LocalesMenu />
          </div>
        </div>
      )
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
