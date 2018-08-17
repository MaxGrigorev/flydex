import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import { connect } from 'react-redux';
import { getRepoDetail } from '../Reducers/dogReducer';

class DogDetail extends Component {
  
  render() {
	  const { img } = this.props;
    return (
      <View>
		<Image
	  source={{uri: img}} style={{width: 400, height: 400}}/>
      </View>
    );
  }
}



export default DogDetail;
