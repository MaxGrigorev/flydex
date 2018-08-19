import { Navigation } from 'react-native-navigation';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider, connect } from 'react-redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import flightReducer from './Reducers/flightReducer';
import FlightList from './Components/FlightList';
import SplashScreen from './Components/SplashScreen';
import ChangeAirportsScreen from './Components/ChangeAirportsScreen';

const middleware = applyMiddleware(promiseMiddleware(), createLogger());
const store = createStore(flightReducer, middleware);

export default () => {
	Navigation.registerComponent('example.FirstTabScreen', () => FlightList,store,Provider);
	Navigation.registerComponent('example.SplashScreen', () => SplashScreen,store,Provider);
	Navigation.registerComponent('example.ChangeAirportsScreen', () => ChangeAirportsScreen,store,Provider);

	Navigation.startSingleScreenApp({
	  screen: {
			screen: 'example.SplashScreen', // unique ID registered with Navigation.registerScreen
			title: 'skY&DEX', // title of the screen as appears in the nav bar (optional)
			navigatorStyle: {
				navBarHidden: true,
				screenBackgroundColor: 'black',
			}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
			navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
	  }
	});
}