import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {store} from './store'
import DemoApp from './DemoApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <DemoApp />
    </Provider>
  </React.StrictMode>,
)
