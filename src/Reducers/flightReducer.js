export const GET_LIKES = 'GET_LIKES';
export const GET_LIKES_PENDING = 'GET_LIKES_PENDING';
export const GET_LIKES_FULFILLED = 'GET_LIKES_FULFILLED';
export const GET_LIKES_REJECTED = 'GET_LIKES_REJECTED';

export const GET_LIKES_PRESS = 'GET_LIKES_PRESS';
export const GET_LIKES_PRESS_PENDING = 'GET_LIKES_PRESS_PENDING';
export const GET_LIKES_PRESS_FULFILLED = 'GET_LIKES_PRESS_FULFILLED';
export const GET_LIKES_PRESS_REJECTED = 'GET_LIKES_PRESS_REJECTED';

export const GET_DOGS = 'GET_DOGS';
export const GET_IMG = 'GET_IMG';
export const GET_IMG_PENDING = 'GET_IMG_PENDING';
export const GET_IMG_FULFILLED = 'GET_IMG_FULFILLED';
export const GET_IMG_REJECTED = 'GET_IMG_REJECTED';
export const GET_DOGS_PENDING = 'GET_DOGS_PENDING';
export const GET_DOGS_FULFILLED = 'GET_DOGS_FULFILLED';
export const GET_DOGS_REJECTED = 'GET_DOGS_REJECTED';
export const ADD_DOGS = 'ADD_DOGS';
export const GET_DOG = 'GET_DOG';
export const GET_DOG_PENDING = 'GET_DOG_PENDING';
export const GET_DOG_FULFILLED = 'GET_DOG_FULFILLED';
export const GET_DOG_REJECTED = 'GET_DOG_REJECTED';

export const GET_AIRPORT = 'GET_AIRPORT';
export const GET_AIRPORT_PENDING = 'GET_AIRPORT_PENDING';
export const GET_AIRPORT_FULFILLED = 'GET_AIRPORT_FULFILLED';
export const GET_AIRPORT_REJECTED = 'GET_AIRPORT_REJECTED';
export const SET_FLAG_FULFILLED = 'SET_FLAG_FULFILLED';

import * as Url from '../Constants/url';

import axios from 'axios';

const initialState = { dogs: [],dogsLike:[], allAirport: {}, loadingAllAirport: true, user: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
    case GET_LIKES_PRESS_PENDING:
      return { ...state, loading: true};
    case GET_LIKES_PRESS_FULFILLED:
      return { ...state, loading: false, dogsLike: action.payload };
    case GET_LIKES_PRESS_REJECTED:
      return { ...state, loading: false, error: 'Error getting dogs info' };
    default:
      return state;
  }
}



// export function listDogs() {
//   return {
//     type: GET_DOGS,
//     payload: {
//       request: {
//         url: `/api/dogs`
//       }
//     }
//   };
// }

export function listDogs() {
  return {
    type: GET_DOG,
    payload: axios.get(Url.BASE_URL+'/api/dogs')
  }
}

export function likeDog(id) {
  console.log('id',id)
  let like= axios.post(Url.BASE_URL+'/api/dogs/like', {
    id: id
  })
  .then((response)=> {
    console.log('likeDog',response)
    return response
  })
  .catch(function (error) {
    console.log(error);
  });

  return {
    type: GET_LIKES,
    payload: like
  };
}

export function likePress(id,dogsLike) {
  console.log('id',id)
  //let temp = ({id:id,dogLikePress:true})
  //dogsLike.push(temp)
  dogsLike.push(id)
  console.log('likePress ', dogsLike)
  return {
    type: GET_LIKES_PRESS_FULFILLED,
    payload: dogsLike
  };
}

export function getAirportInfo(type='arr',fscode='SVO',date) {
  console.log('getArrival' ,type)
  return {
    type: GET_DOG,
    payload: axios.get(`https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/${fscode}/${type}/2018/8/17/23?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90&utc=false&numHours=6&maxFlights=50`)
  }
}


export function setFlag() {
  return {
    type: SET_FLAG_FULFILLED,
    payload: true
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
  
  let allAirports=axios.get('https://api.flightstats.com/flex/airports/rest/v1/json/countryCode/RU?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90').then((response)=> {
    console.log('getAllAirport',response)
    let tmp=response.data.airports.reduce(
      (hash, airport) => {
      let city=airport.city
      let localTime=airport.localTime
      hash[airport.fs] = {city,localTime}
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

// export function getAirportInfo() {

//   //alert('email: ' + breed + ' password: ' + imgUrl)
//   axios.get('https://api.flightstats.com/flex/flightstatus/rest/v2/json/airport/status/SVO/arr/2018/8/17/10?appId=b842b7e6&appKey=4682ce2ea97524e76b0e722f83a66b90&utc=false&numHours=1&maxFlights=5')
//   .then(function (response) {
//     console.log(response)
//     return {
//       type: GET_DOGS_SUCCESS,
//       payload: response
//     };
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }