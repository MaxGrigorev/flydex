import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

import { listDogs, likeDog, likePress,getAirportInfo,changeAirport} from '../Reducers/flightReducer';
import * as Url from '../Constants/url';
import {status} from '../Constants/status';

class ChangeAirportsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text_breed: '',
      tab_type: 'arr',
    };
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.changeHandle = this.changeHandle.bind(this);
  }


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

  changeHandle=(item)=>{
    console.log('this.props.dogsLike',this.props.dogsLike)
    let fs=item.fs
    let obj={}
    obj[fs]=item
    // this.props.likePress(item._id,this.props.dogsLike)
    this.props.changeAirport(obj)
    this.props.navigator.resetTo({
      screen: 'example.FirstTabScreen',
      title: item.name,
  });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (this.state.tab_type!==nextState.tab_type) {
    //   return false;
    // }
    return true;
  }

  componentDidMount() {
    //this.props.listDogs();
    //this.props.getAirportInfo('arr',this.props.currentAirport);
  }

//renderItem={({item}) => <View><Image source={{uri: item._id}} style={{width: 400, height: 400}}/><Text style={styles.item}>{item.breed}</Text></View>}
//{this.props.allAirport[item.departureAirportFsCode].city}
  renderItem = ({ item }) => (
    <View >
	  
    <TouchableOpacity
      style={styles.item}
      onPress={this.changeHandle.bind(this,item)}
      >
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Text style={{fontSize:30}}>{item.city} </Text>
        <Text style={{fontSize:30}}>{item.fs} </Text>
      </View >
    </TouchableOpacity>
    </View >
  );
  render() {
    //this.toggleFAB();
    const { allAirport } = this.props;

    let allAirportArray=Object.keys(allAirport).map((key, index)=>allAirport[key]);
   
    let ltt=allAirportArray.filter(dog=>(-1<dog.city.indexOf(this.state.text_breed)))
    //if (this.state.tab_type==='del') ltt=ltt.filter(dog=>(dog.status==='D'))
    console.log('allAirport', allAirportArray)

    return (
      <View >
        <TextInput
        style={{height:40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text_breed) => this.setState({text_breed})}
        value={this.state.text_breed}
        />
        <FlatList
          styles={styles.container}
          data={ltt}
          renderItem={this.renderItem}
          keyExtractor={(item, index) =>  index.toString()}
        />
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
  let storedAllAirport={...state.allAirport};
  let storedCurrentAirport={...state.currentAirport};
  return {
    allAirport:storedAllAirport,
    currentAirport:storedCurrentAirport,
  };
};

const mapDispatchToProps = {
  getAirportInfo,changeAirport
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAirportsScreen);