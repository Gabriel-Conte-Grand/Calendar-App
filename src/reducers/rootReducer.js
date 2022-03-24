import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./CalendarReducer";
import { uiReducer } from "./uiReducers";

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})

