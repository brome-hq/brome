import { requireAuth } from '../../Auth'

const routeName = 'testbatchrunnerlog'

export default (store) => ({
  path: routeName,
  onEnter: requireAuth(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./containers/Container').default
      cb(null, Container)
    })
  }
})

