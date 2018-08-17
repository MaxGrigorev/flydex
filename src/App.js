import { Navigation } from 'react-native-navigation';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider, connect } from 'react-redux';
//import axios from 'axios';
//import axiosMiddleware from 'redux-axios-middleware';

import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import flightReducer from './Reducers/flightReducer';

//import DogList from './Components/DogList';
import FlightList from './Components/FlightList';
//import DogDetail from './Components/DogDetail';
//import RNCameraRollPicker from './RNCameraRollPicker';

import * as Url from './Constants/url';

//Объединения
const middleware = applyMiddleware(promiseMiddleware(), createLogger());

// const reducers = combineReducers({
// 	dogs: dogReducer,

// 	//user: usersReducer
// });

// const store = createStore(reducers, middleware);
const store = createStore(flightReducer, middleware);



// const client = axios.create({
//   baseURL: Url.BASE_URL,
//   responseType: 'json'
// });

// const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

export default () => {
	Navigation.registerComponent('example.FirstTabScreen', () => FlightList,store,Provider);
	
	Navigation.startSingleScreenApp({
	  screen: {
			screen: 'example.FirstTabScreen', // unique ID registered with Navigation.registerScreen
			title: 'skY&DEX', // title of the screen as appears in the nav bar (optional)
			navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
			navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
	  }
	});
}