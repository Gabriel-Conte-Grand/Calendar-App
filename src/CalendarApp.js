import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { store } from './store/store'
import { Provider } from 'react-redux'



export const CalendarApp = () => {
  return (
    <Provider store={store} >
      <Router >
                <AppRouter />
      </Router>
    </Provider>
  )
}
