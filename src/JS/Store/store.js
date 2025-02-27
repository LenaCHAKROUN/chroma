//import create store 
import {createStore,applyMiddleware,compose} from "redux"

//import rootReducers
import rootReducer from "../Reducers"
import {thunk} from "redux-thunk"
const composeEnhancer = window._REDUXDEVTOOLS_EXTENSION_COMPOSE__ || compose;


//store
const store =createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

//export
export default store;