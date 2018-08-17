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

import { listDogs, likeDog, likePress,getAirportInfo } from '../Reducers/flightReducer';
import * as Url from '../Constants/url';

class FlightList extends Component {

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

  likeHandle=(item)=>{
    console.log('this.props.dogsLike',this.props.dogsLike)

    this.props.likePress(item._id,this.props.dogsLike)
    this.props.likeDog(item._id)
  }

  componentDidMount() {
    //this.props.listDogs();
    this.props.getAirportInfo();
  }

//renderItem={({item}) => <View><Image source={{uri: item._id}} style={{width: 400, height: 400}}/><Text style={styles.item}>{item.breed}</Text></View>}

  renderItem = ({ item }) => (
    <View >
	  
    <TouchableOpacity
      style={styles.item}
      onPress={this.likeHandle.bind(this,item)}
      >
    <View style={{flex: 1,flexDirection: 'row'}}>
      <Image  source={(this.props.dogsLike.indexOf(item._id)!=-1) ? require('../img/icons8-heart-outline-50-red.png') :require('../img/icons8-heart-outline-50.png')}  style={{width: 40, height: 40,}}/>
      <Text style={{fontSize:30}}>{item.departureAirportFsCode} </Text>
      <Text style={{fontSize:30}}>{item.carrierFsCode} </Text>
      <Text style={{fontSize:30}}>{item.flightNumber} </Text>
      <Text style={{fontSize:30}}>{item.status} </Text>
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
    console.log('dogs', dogs)
    //если запускаем без сервера
    //const dogs=[{"_id":"5b4edc6249d74f30e2b46566","breed":"springer-english","img":"https://images.dog.ceo/breeds/springer-english/n02102040_7011.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //		{"_id":"5b4edca449d74f30e2b46567","breed":"kelpie","img":"https://images.dog.ceo/breeds/kelpie/n02105412_3078.jpg"},{"_id":"5b4edccd49d74f30e2b46568","breed":"rottweiler","img":"https://images.dog.ceo/breeds/rottweiler/n02106550_2832.jpg"},{"_id":"5b4edcf449d74f30e2b46569","breed":"beagle","img":"https://images.dog.ceo/breeds/beagle/n02088364_9650.jpg"},
    //    {"_id":"5b4edd1749d74f30e2b4656a","breed":"akita","img":"https://images.dog.ceo/breeds/akita/Akita_Inu_dog.jpg"}]
	  //console.log('dogs',dogs)
    return (
      <FlatList
        styles={styles.container}
        data={dogs}
        renderItem={this.renderItem}
		keyExtractor={(item, index) =>  index.toString()}
      />
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
  return {
    dogs: storedDogs,
    dogsLike:storedDogsLike
  };
};

const mapDispatchToProps = {
  listDogs,likeDog,likePress,getAirportInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);