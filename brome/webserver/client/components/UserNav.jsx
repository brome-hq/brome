import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'
import 'font-awesome-webpack'

import BaseComponent from 'core/BaseComponent'
import UserNavStyle from './UserNavStyle.postcss'

class UserNav extends BaseComponent {

  constructor (props) {
    super(props)

    this._initLogger()
  }

  render () {
    return (
      <div>
        <ul className='nav navbar-nav navbar-right nav-pills'>
          <li role='presentation' className='dropdown'>
            <a className='dropdown-toggle small' data-toggle='dropdown' href='#' role='button' aria-haspopup='true' aria-expanded='false'>
              {this.props.state.session.user.name}
              {' '}
              <i className='fa fa-caret-down' aria-hidden='true'></i>
              <div className={'pull-right ' + UserNavStyle['profile-img']}>
                <img className='img-responsive img-circle' src={this.props.state.session.user.gravatar_url} />
              </div>
            </a>
            <ul className='dropdown-menu'>
              <li>
                <Link to='/profile'>
                  <FormattedMessage
                    id='nav.Profile'
                    defaultMessage='Profile'
                  />
                </Link>
              </li>
              <li>
                <Link to='/logout'>
                  <FormattedMessage
                    id='nav.Logout'
                    defaultMessage='Logout'
                  />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    state
  }
}

export default connect(mapStateToProps)(UserNav)
