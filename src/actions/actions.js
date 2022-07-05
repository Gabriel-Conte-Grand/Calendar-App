import Swal from "sweetalert2"
import { prepareEvents } from "../helpers/eventsToDate"
import { fetchConToken, fetchSinToken } from "../helpers/fetch"

export const types = {
    //UI
    uiOpenModal : '[ui] Open modal',
    uiCloseModal : '[ui] Close modal',
    
    //CALENDAR
    setActiveEvent: '[event] Set Active',
    eventLogout: '[event] Logout Event',

    eventStartAddNew: '[event] Start add new',


    addNewEvent : '[event] Add new',
    clearActiveEvent: '[event] Clear Active Event',
    eventUpdate : '[event] Event updated',
    deleteEvent: '[event] Event Deleted',
    eventLoaded: '[event] Events loaded',

    //AUTH
    CheckingFinish : '[auth] Finish Checking',
    StartLogin : '[auth] Start Login',
    Login: '[auth] Login',
    StartRegister: '[auth] Start Register',
    StartTokenRenew: '[auth] Start token Renew',
    Logout : '[auth] Logout' 

}

// UI ACTIONS   
export const uiOpenModal = () => ({type: types.uiOpenModal})

export const uiCloseModal = () => ({type: types.uiCloseModal})


//CALENDAR ACTIONS

export const eventStartAddNew = ( event ) => {
    
    return async( dispatch, getState ) => {

        const {uid , name } = getState().auth
       
       try{
        const resp = await fetchConToken( 'events', event, 'POST')
        const body = await resp.json();
       
        if(body.ok){
            event.id = body.evento.id
            event.user = { 
                _id: uid,
                name: name
             }

            dispatch(addNewEvent( event ))
        }
        
       }catch( error ){
        console.log(error)
       }

    }
}

const addNewEvent = (event) => ({
    type: types.addNewEvent,
    payload: event
})


export const setActiveEvent = (event) => ({
    type: types.setActiveEvent,
    payload: event
}
)

export const eventClearActiveEvent = () => ({type: types.clearActiveEvent})


export const eventStartUpdate = (event) => {
    
    return async(dispatch) => {

        try{

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
            const body = await resp.json()

            if( body.ok ){
                dispatch( eventUpdate(event) )
            }else{
                Swal.fire('error', body.msg, 'error')
            }

        }catch(error){
            console.log(error)
        }
    

    }
}


const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
})




export const eventStartDelete = ( ) => {
    
    return async(dispatch, getState) => {

        const { id } = getState().calendar.activeEvent


        try{

            const resp = await fetchConToken(`events/${ id }`, {} ,'DELETE')
            const body = await resp.json()

            if( body.ok ){
                dispatch( deleteEvent() )
            }else{
                Swal.fire('Error', body.msg, 'error')
            }

        }catch(error){
            console.log(error)
        }



    }
}



const deleteEvent = () => ({type: types.deleteEvent})


export const eventsStartLoading = () => {
    
    return async(dispatch) => {

       try{

        const resp = await fetchConToken( 'events' )
        const body = await resp.json()
        
        const events = prepareEvents( body.eventos )
        
       
        dispatch( eventLoaded( events ))

       }catch(error){
           console.log(error)
       }


    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
})



// AUTH ACTIONS


export const startLogin = (email, password) => {
    return async( dispatch ) => {
       const resp = await fetchSinToken('auth', {email, password}, 'POST')
       const body = await resp.json()
    
       if( body.ok ){
           localStorage.setItem('token', body.token)
           localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
       }else{
           Swal.fire('Error', body.msg, 'error')
       }
    
    };
}

export const startRegister = ( email, password, name ) => {

    return async(dispatch) => {

        const resp = await fetchSinToken('auth/new', {email, password, name}, 'POST')
        const body = await resp.json()

        if( body.ok ){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() );
 
             dispatch( login({
                 uid: body.uid,
                 name: body.name
             }) )
        }else{
            Swal.fire('Error', body.msg, 'error')
        }

    }


}

export const startChecking = () => {

    return async(dispatch) => {

        const resp = await fetchConToken('auth/renew')
        const body = await resp.json()

        if( body.ok ){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime() );
 
             dispatch( login({
                 uid: body.uid,
                 name: body.name
             }) )
        }else{
            
            dispatch(checkingFinish() )
        }

    }

}
const checkingFinish = () => ({ type: types.CheckingFinish })



const login = ( user ) => ({
    type: types.Login,
    payload: user
})


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout())
        dispatch(logout())
    }
}

export const eventLogout = () => ({ type: types.eventLogout})


const logout = () => ({ type: types.Logout })

