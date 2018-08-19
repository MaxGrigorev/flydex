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

import { listDogs, likeDog, likePress,getAirportInfo} from '../Reducers/flightReducer';
import * as Url from '../Constants/url';
import {status} from '../Constants/status';

class FlightList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text_breed: '',
      tab_type: 'arr',
    };
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

  likeHandle=(item)=>{
    console.log('this.props.dogsLike',this.props.dogsLike)

    this.props.likePress(item._id,this.props.dogsLike)
    this.props.likeDog(item._id)
  }

  TabVilet=(type)=>{
    console.log('TabVilet')
    this.setState({tab_type: type});
    if (type==='del') type='dep';
    this.props.getAirportInfo(type,this.props.currentAirport);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.tab_type!==nextState.tab_type) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    //this.props.listDogs();
    this.props.getAirportInfo('arr',this.props.currentAirport);
  }

//renderItem={({item}) => <View><Image source={{uri: item._id}} style={{width: 400, height: 400}}/><Text style={styles.item}>{item.breed}</Text></View>}
//{this.props.allAirport[item.departureAirportFsCode].city}
  renderItem = ({ item }) => (
    <View >
	  
    <TouchableOpacity
      style={styles.item}
      onPress={this.likeHandle.bind(this,item)}
      >
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Image  source={(this.props.dogsLike.indexOf(item._id)!=-1) ? require('../img/icons8-heart-outline-50-red.png') :require('../img/icons8-heart-outline-50.png')}  style={{width: 40, height: 40,}}/>
  <Text style={{fontSize:30}}> {(this.state.tab_type=='arr') ? item.departureAirportFsCode : item.arrivalAirportFsCode} </Text>
        <Text style={{fontSize:30}}>{item.carrierFsCode} </Text>
        <Text style={{fontSize:30}}>{item.flightNumber} </Text>
        <Text style={{fontSize:30}}>{status[item.status]} </Text>
      </View >
      <View style={{flex: 1,flexDirection: 'row'}}>
        <Text style={{fontSize:15}}>{item.departureDate.dateLocal} -- {item.arrivalDate.dateLocal}</Text>
      </View >
    </TouchableOpacity>
    </View >
  );
  render() {
    //this.toggleFAB();
    const { dogs } = this.props;
    let ltt=dogs.filter(dog=>(-1<dog.flightNumber.indexOf(this.state.text_breed)))
    if (this.state.tab_type==='del') ltt=ltt.filter(dog=>(dog.status==='D'))
    console.log('ltt', ltt)

    return (
      <View >
        <View style={{height:40,flexDirection: 'row',borderColor: 'gray',borderWidth: 1}} >

          <TouchableOpacity
            style={{flex: 1,height:40,borderColor: 'gray',borderWidth: 1}}
            onPress={this.TabVilet.bind(this,'arr')}
            >
              <Text style={{fontSize:30,flex: 1,}}>Arrival</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1,height:40,borderColor: 'gray',borderWidth: 1}}
            onPress={this.TabVilet.bind(this,'dep')}
            >
              <Text style={{fontSize:30,flex: 1,}}>Departure</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flex: 1,height:40,borderColor: 'gray',borderWidth: 1}}
            onPress={this.TabVilet.bind(this,'del')}
            >
              <Text style={{fontSize:30,flex: 1,}}>Delay</Text>
          </TouchableOpacity>

          
        </View >
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
  let storedDogs = state.dogs.map(dog => ({...dog }));
  let storedDogsLike = state.dogsLike.map(dogLike => (dogLike));
  let storedAllAirport={...state.allAirport};
  let storedCurrentAirport={...state.currentAirport};
  return {
    dogs: storedDogs,
    dogsLike:storedDogsLike,
    allAirport:storedAllAirport,
    currentAirport:storedCurrentAirport,
  };
};

const mapDispatchToProps = {
  listDogs,likeDog,likePress,getAirportInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);