export const GET_DOG = 'GET_DOG';
export const GET_DOG_PENDING = 'GET_DOG_PENDING';
export const GET_DOG_FULFILLED = 'GET_DOG_FULFILLED';
export const GET_DOG_REJECTED = 'GET_DOG_REJECTED';

export const GET_AIRPORT = 'GET_AIRPORT';
export const GET_AIRPORT_PENDING = 'GET_AIRPORT_PENDING';
export const GET_AIRPORT_FULFILLED = 'GET_AIRPORT_FULFILLED';
export const GET_AIRPORT_REJECTED = 'GET_AIRPORT_REJECTED';
export const SET_FLAG_FULFILLED = 'SET_FLAG_FULFILLED';
export const SET_CURRENT_AIRPORT_FULFILLED = 'SET_CURRENT_AIRPORT_FULFILLED';
import axios from 'axios';

curAirport={SVO:{name: "Sheremetyevo International Airport", city: "Moscow", countryName: "Russian Federation", localTime: "2018-08-19T14:31:45.635"}}

const initialState = { dogs: [], allAirport: {}, loadingAllAirport: true, currentAirport: curAirport };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_AIRPORT_FULFILLED:
      return { ...state, currentAirport: action.payload};
    case SET_FLAG_FULFILLED:
      return { ...state, loadingAllAirport: true};
	  case GET_DOG_PENDING:
      return { ...state, loading: true };
    case GET_DOG_FULFILLED:
      return { ...state, loading: false, dogs: action.payload.data.flightStatuses };
    case GET_DOG_REJECTED:
      return { ...state, loading: false, error: 'Error getting dogs info' };
    case GET_AIRPORT_PENDING:
      return { ...state, loadingAllAirport: true};
    case GET_AIRPORT_FULFILLED:
      return { ...state, loadingAllAirport: false, allAirport: action.payload };
    case GET_AIRPORT_REJECTED:
      return { ...state, loadingAllAirport: false, error: 'Error getting dogs info' };
    default:
      return state;
  }
}

export function getAirportInfo(type='arr',currentAirports) {
  fscode=Object.keys( currentAirports)[0]
  dateTime=changeToDateTimeUrl(currentAirports[fscode].localTime)
  console.log('getArrival' ,Object.keys( currentAirports)[0])
  return {
    type: GET_DOG,
    payload: axios.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/${fscode}/${type}/${dateTime}?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90&utc=false&numHours=6&maxFlights=50`)
  }
}

function changeToDateTimeUrl(localTime) {

  String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
  //2018-08-19T14:31:45.635
  //1) > 12 delete
  //2)4,7,10 on /
  //3)11==0 delete -> 8==0 delete -> 5==0 delete
  let sub=localTime.slice(0,13)
  console.log('sub',sub)
  sub=sub.replaceAt(10, '/')
  sub=sub.replaceAt(7, '/')
  sub=sub.replaceAt(4, '/')
  console.log('sub',sub)
  if (sub[11]==='0') sub=sub.replace('/0', '/')
  if (sub[8]==='0') sub=sub.replace('/0', '/')
  if (sub[5]==='0') sub=sub.replace('/0', '/')
  console.log('sub',sub)
  
  return sub
}


export function setFlag() {
  return {
    type: SET_FLAG_FULFILLED,
    payload: true
  }
}


export function changeAirport(currAirport) {
  return {
    type: SET_CURRENT_AIRPORT_FULFILLED,
    payload: currAirport
  }
}



export function getAllAirport1() {
  return {
    type: GET_AIRPORT,
    //payload: axios.get('https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90')
    payload: axios.get('https://api.flightstats.com/flex/airports/rest/v1/json/countryCode/RU?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90')
  }
}

export function getAllAirport() {
  //countryCode/RU  active  all
  let allAirports=axios.get('https://api.flightstats.com/flex/airports/rest/v1/json/active?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90').then((response)=> {
    console.log('getAllAirport',response)
    let tmp=response.data.airports.reduce(
      (hash, airport) => {
      let name=airport.name
      let city=airport.city
      let countryName=airport.countryName
      let localTime=airport.localTime
      let fs=airport.fs
      hash[airport.fs] = {fs,name,city,countryName,localTime}
      return hash
      },
      {}
     );
    console.log('tmp',tmp)
    return tmp
  })


  return {
    type: GET_AIRPORT,
    payload: allAirports
  }
}