import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventsStartLoading, setActiveEvent, uiOpenModal } from '../../actions/actions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

//


// const events = [{
//   title: 'Team meeting',
//   start: moment().toDate(),
//   end: moment().add(2, 'hours').toDate(),
//   notes: 'daily meeting',
//   user: {
//     _id: '123',
//     name: 'Fernando'
//   }
// }]

const messages = { next: '>>', previous: '<<'}




export const CalendarScreen = () => {

  

 const dispatch = useDispatch()
 
 const { events, activeEvent } = useSelector(state => state.calendar)
 const { uid } = useSelector(state => state.auth)

  const [ lastView , setLastView ] = useState(localStorage.getItem('lastView') || 'month')

  useEffect(() => {
    
    dispatch( eventsStartLoading())
    
  }, [dispatch])
  



 const onDoubleCLick = (e) => {
  dispatch(uiOpenModal())
 }

 const onSelectEvent = (e) => {
   dispatch(setActiveEvent(e))
   
 }

 const onViewChange = (e) => {
   setLastView(e)
   localStorage.setItem('lastView', e)
 }


 const onSelectSlot = (e) => {
   dispatch( eventClearActiveEvent() )
 }

 const eventStyleGetter = (event, start, end, isSelected ) => {
    

    const style = {
      backgroundColor:( uid === event.user._id ) ? '#367cf7' : '#465660',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white'
    }

    return { 
      style
    } 
      
 }

  return (
    <div className='calendar-screen'>
      <NavBar />

      <Calendar
      localizer={localizer}
      events={ events }
      startAccessor="start"
      endAccessor="end"
      messages= {messages}
      eventPropGetter={ eventStyleGetter }
      onDoubleClickEvent={ onDoubleCLick }
      onSelectEvent={ onSelectEvent }
      onView={ onViewChange }
      onSelectSlot={ onSelectSlot } 
      selectable={ true }
      view={lastView}
      components= {{ event: CalendarEvent }}

    />

    { activeEvent && <DeleteEventFab/> }

    
    <AddNewFab  />
    <CalendarModal />
    </div>
  )
}
