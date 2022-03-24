import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import { startChecking } from '../actions/actions'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

  const dispatch = useDispatch();

  const { checking, uid } = useSelector( state => state.auth)

  useEffect(() => {
    
    dispatch(startChecking())

    
  }, [dispatch])
  
  if( checking ){
    return <h5>Please await..</h5>
  }

  return (
    <div>
        <Switch>
        
        <PublicRoute
         exact path={'/login'}
         component={ LoginScreen }
         isAuthenticated= { !!uid } //si hay uid, esta autenticado
        />

        <PrivateRoute
         exact path ={'/'} 
         component={ CalendarScreen } 
         isAuthenticated= { !!uid }
         />

        <Redirect to={'/'} />
        
        </Switch>
    </div>
  )
}
