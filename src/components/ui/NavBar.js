import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/actions'

export const NavBar = () => {
  
  const { name } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch( startLogout() );
  }
  
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
    <span className='navbar-brand'>
      {name}
    </span>

    <button className='btn btn-danger'
    onClick={ handleLogout }
    >
        <i className="fa fa-sign-out-alt mr-1"> </i>
        <span>Log out</span>
    </button>
    </div>
  )
}
