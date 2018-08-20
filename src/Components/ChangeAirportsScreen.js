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

import { changeAirport} from '../Reducers/flightReducer';

class ChangeAirportsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text_breed: '',
    };
    this.changeHandle = this.changeHandle.bind(this);
  }

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
    const { allAirport } = this.props
    let allAirportArray=Object.keys(allAirport).map((key, index)=>allAirport[key])
    let ltt=allAirportArray.filter(dog=>(-1<dog.city.indexOf(this.state.text_breed)))

    return (
      <View >
        <View style={{height:40,flexDirection: 'row',borderRadius: 50,borderColor: 'gray',borderWidth: 1,marginVertical:5}} >
        <Image  source={require('../img/search-icon.png')}  style={{width: 40, height: 40,}}/>
          <TextInput
            style={{height:40,flex:1,margin:5,fontSize:20}}
            onChangeText={(text_breed) => this.setState({text_breed})}
            value={this.state.text_breed}
          />
        </View >
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
  return {
    allAirport:storedAllAirport,
  };
};

const mapDispatchToProps = {
  changeAirport
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAirportsScreen);