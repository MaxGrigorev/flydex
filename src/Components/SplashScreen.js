import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
	Image
} from 'react-native';
import { connect } from 'react-redux';

import { listDogs,getAirportInfo,getAllAirport,setFlag } from '../Reducers/flightReducer';
import * as Url from '../Constants/url';

class SplashScreen extends Component {

  constructor(props) {
    super(props);

    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    //this.likeHandle = this.likeHandle.bind(this);
  }

  // onNavigatorEvent(event) {
  //   if (event.id === 'share') {
  //     this.props.navigator.push({
  //       screen: 'example.RNCameraRollPicker',
  //       title: 'Добавить',
  //     })
  //   }
  // }

  // toggleFAB = () => {
  //   this.props.navigator.setButtons({
  //         fab: {
  //           collapsedId: 'share',
  //           collapsedIcon: require('../img/icons8-plus-math-60.png'),
  //           backgroundColor: '#ff505c',
  //         },
  //         animated: true
  //       });
  // }

  // likeHandle=(item)=>{
  //   console.log('this.props.dogsLike',this.props.dogsLike)

  //   this.props.likePress(item._id,this.props.dogsLike)
  //   this.props.likeDog(item._id)
  // }

  componentDidMount() {
    //this.props.listDogs();
    this.props.getAllAirport();
  }

//renderItem={({item}) => <View><Image source={{uri: item._id}} style={{width: 400, height: 400}}/><Text style={styles.item}>{item.breed}</Text></View>}


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

    const { dogs } = this.props;
    return (
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
      
      <Text style={{fontSize:30,color:'#fff'}}> fl<Text style={{fontSize:30,color:'#f00'}}>Y</Text>&DEX </Text>

    </View >
    );
  }
}

/* <View >
	  
    <View style={{flex: 1,flexDirection: 'row'}}>
      <Image  source={require('../img/icons8-heart-outline-50-red.png')}  style={{width: 40, height: 40,}}/>
      <Text style={{fontSize:30,backgroundColor: '#000',}}> skYDEX </Text>

    </View >
    <View style={{flex: 1,flexDirection: 'row'}}>
      <Text style={{fontSize:15,backgroundColor: '#000',}}>Загрузка...</Text>
    </View >
    </View > */

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
  let storedDogsLike = state.dogsLike.map(dogLike => (dogLike));
  let storedallAirport={...state.allAirport};
  const storedLoadingAllAirport=state.loadingAllAirport

  return {
    dogs: storedDogs,
    dogsLike:storedDogsLike,
    allAirport:storedallAirport,
    loading:storedLoadingAllAirport,
  };
};

const mapDispatchToProps = {
  listDogs,getAirportInfo,getAllAirport,setFlag,
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);