import * as ReadableAPI from './readableAPI'
import * as LocalStorageAPI from './localStorageAPI'

export const backgroundSync = () => {
  setInterval(() => {
    if (navigator.onLine) {
      console.log('ONLINE!')
      showActions()
    } else {
      console.log('no connection')
    }
  }, 3000)
}

const showActions = () => {
  const actions = LocalStorageAPI.getAllPendingActions()
  console.log('ALL PENDING ACTIONS:')
  console.log(actions)
  LocalStorageAPI.cleanAllPendingActions()
}
