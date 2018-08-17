
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';
import futch from '../api';
import * as Url from '../Constants/url';

export default class RNCameraRollPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
      progress: 0,
      text_breed: '',
    };
    this.sendServer = this.sendServer.bind(this);
  }

  getSelectedImages(images, current) {
    //var num = images.length;

    this.setState({
     // num: num,
      selected: images,
    });
  }
  
  sendServer() {
    console.log(this.state.selected)
    const photos = this.state.selected;
    const data = new FormData();
    data.append('name', 'testName');
    photos.forEach((photo, index) => {
      data.append('photos', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: this.state.text_breed,
      });
    })
    console.log(data)
    const url = Url.BASE_URL+'/api/dogs';
    futch(url + '/array', {
      method: 'post',
      body: data
    }, (e) => {
      const progress = e.loaded / e.total;
      console.log(progress);
      this.setState({
        progress: progress
      });
    }).then((res) => {
      console.log(res);
      this.props.navigator.resetTo({
        screen: 'example.FirstTabScreen',
        title: 'instaDOG',
    });
    }, (e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker
          scrollRenderAheadDistance={500}
          initialListSize={1}
          pageSize={3}
          removeClippedSubviews={false}
          groupTypes='SavedPhotos'
          batchSize={5}
          maximum={1}
          selected={this.state.selected}
          assetType='Photos'
          imagesPerRow={3}
          imageMargin={5}
          callback={this.getSelectedImages.bind(this)} />

        
          <View style={styles.content}>
            <Text style={styles.text}> Введи название </Text>
            <TextInput
                  style={{width: 100, flex: 1, height:30, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(text_breed) => this.setState({text_breed})}
                  value={this.state.text_breed}
              />
          </View>
        <TouchableOpacity
            style = {styles.submitButton}
            onPress={this.sendServer}
            >
            <Text style = {styles.submitButtonText}>{ (!this.state.progress) ? 'Отправить' : 'Отправка...'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height:80,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
//   container: {
//     paddingTop: 23
//  },
 input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
 },
 submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
 },
 submitButtonText:{
    color: 'white'
 }
});
