import React from 'react'
import { useDispatch } from 'react-redux'
import { eventStartDelete } from '../../actions/actions'

export const DeleteEventFab = () => {
  
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch( eventStartDelete() )
  }
  
    return (
    <button
    className='btn btn-danger fab-danger'
    onClick={ handleDelete }
    >
        <i className='fas fa-trash'></i>
        <span className='trash'>Delete Event</span>
    </button>
  )
}
