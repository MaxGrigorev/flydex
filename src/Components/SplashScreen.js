import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import { listDogs,getAirportInfo,getAllAirport,setFlag } from '../Reducers/flightReducer';

class SplashScreen extends Component {

  constructor(props) {
    super(props);

  }



  componentDidMount() {
    this.props.getAllAirport();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.loading) {
      return false;
    }
    return true;
  }
  
  render() {
    if (!this.props.loading) {
      setFlag()
      this.props.navigator.resetTo({
        screen: 'example.FirstTabScreen',
        title: 'Sheremetyevo Airport',
    });
    }

    return (
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
      
      <Text style={{fontSize:30,color:'#fff'}}> fl<Text style={{fontSize:30,color:'#f00'}}>Y</Text>&DEX </Text>

    </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
  }
});

const mapStateToProps = state => {

	console.log('mapStateToProps', state)
  let storedDogs = state.dogs.map(dog => ({}));
  let storedallAirport={...state.allAirport};
  const storedLoadingAllAirport=state.loadingAllAirport

  return {
    dogs: storedDogs,
    allAirport:storedallAirport,
    loading:storedLoadingAllAirport,
  };
};

const mapDispatchToProps = {
  listDogs,getAirportInfo,getAllAirport,setFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);