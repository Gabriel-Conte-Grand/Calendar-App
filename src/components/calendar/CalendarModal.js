import React, { useEffect, useState } from 'react'

import moment from 'moment';
import Modal from 'react-modal/lib/components/Modal'
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import {  eventClearActiveEvent, eventStartAddNew, eventStartUpdate, uiCloseModal } from '../../actions/actions';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
}

Modal.setAppElement('#root')

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const late = now.clone().add(1, 'hours')

const initEvent = {
    title:'',
    notes:'',
    start: now.toDate(),
    end: late.toDate()
}


export const CalendarModal = () => {
    
    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } =  useSelector(state => state.calendar )
    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState(now.toDate())

    const [endDate, setEndDate] = useState(late.toDate())

    const [titleValid, setTitleValid] = useState(true)

   const [formValues, setFormValues] = useState(initEvent)
   
   const { title, notes, start, end } = formValues


   useEffect(() => {
    //cuando activeEvent no este en null -->
    if(activeEvent){
         setFormValues(activeEvent)
        }
    else{
        setFormValues(initEvent)
    }
     
   }, [activeEvent])
   


   const handleInputChange = (e) => {
       setFormValues({
           ...formValues,
           [e.target.name] : e.target.value
       })
   }

   //SUBMIT DEL EVENTO

   const handleSubmit = (e) => {
       e.preventDefault();

       const momentStart = moment(start)
       const momentEnd = moment(end)
       
       // controlo q la hora inicio este siempre 1°
       if( momentStart.isSameOrAfter( momentEnd )){
           
           Swal.fire('Error', 'La fecha de inicio debe estar antes a la de fin', 'warning')
       }

       if(title.trim().length < 2 ){
           return setTitleValid(false)
       }
       if ( activeEvent ){
           dispatch( eventStartUpdate( formValues ) )
       } else{
           dispatch( eventStartAddNew(formValues) )
           
       }

      setTitleValid(true);
      closeModal(); 

   }

   //
   
    const closeModal = () => {
       dispatch(uiCloseModal())
       dispatch( eventClearActiveEvent() )
       setFormValues(initEvent)
    }

    const handleStartDate = (e) => {
        setStartDate(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDAte = (e) => {
        setEndDate(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

  
    return (
    <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        closeTimeoutMS={ 200 }
        onRequestClose={closeModal}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
      >
          <h1>{ (activeEvent) ? 'Edit Event' : 'New Event'   }</h1>
<hr />
<form className="container" onSubmit={ handleSubmit }>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker onChange={ handleStartDate }
         value={ startDate } 
         className='form-control'
         />
        {/* <input className="form-control" placeholder="Fecha inicio" /> */}
    </div>

    <div className="form-group">
        <label>Fecha y hora fin</label>
        <DateTimePicker onChange={ handleEndDAte }
         value={ endDate } 
         minDate={ startDate }
         className='form-control'
         />
        {/* <input className="form-control" placeholder="Fecha fin" /> */}
    </div>

    <hr />
    <div className="form-group">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={ `form-control ${ !titleValid && 'is-invalid' }`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={ handleInputChange }
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={ handleInputChange }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>

      </Modal>
  )
}
