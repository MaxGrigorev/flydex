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
import { listDogs, getAirportInfo} from '../Reducers/flightReducer';
import {status} from '../Constants/status';

class FlightList extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Change', // for a textual button, provide the button title (label)
        id: 'edit', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        testID: 'e2e_rules', // optional, used to locate this view in end-to-end tests
        // disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
        // disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
        showAsAction: 'ifRoom', // optional, Android only. Control how the button is displayed in the Toolbar. Accepted valued: 'ifRoom' (default) - Show this item as a button in an Action Bar if the system decides there is room for it. 'always' - Always show this item as a button in an Action Bar. 'withText' - When this item is in the action bar, always show it with a text label even if it also has an icon specified. 'never' - Never show this item as a button in an Action Bar.
        buttonColor: 'black', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      text_breed: '',
      tab_type: 'arr',
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
      if (event.id == 'edit') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
          screen: 'example.ChangeAirportsScreen',
          title: 'Change Airports',
          passProps: {}
        })
      }
    }
  }

  TabVilet=(type)=>{
    console.log('TabVilet')
    this.setState({tab_type: type});
    if (type==='del') {type='dep';}
    this.props.getAirportInfo(type,this.props.currentAirport);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.tab_type!==nextState.tab_type) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.props.getAirportInfo('arr',this.props.currentAirport);
  }

//renderItem={({item}) => <View><Image source={{uri: item._id}} style={{width: 400, height: 400}}/><Text style={styles.item}>{item.breed}</Text></View>}
//{(this.state.tab_type=='arr') ? this.props.allAirport[item.departureAirportFsCode].city:this.props.allAirport[item.arrivalAirportFsCode].city}
  renderItem = ({ item }) => (
    <View >
	  
    <TouchableOpacity
      style={styles.item}
      >
      <View style={{flex: 1,flexDirection: 'row',borderColor: 'black',borderBottomWidth: 1,justifyContent: 'center',
        alignItems: 'center',}}>
        <Text style={{fontSize:20}}>{((this.state.tab_type=='arr') ? item.arrivalDate.dateLocal : item.departureDate.dateLocal).slice(11,16)} </Text>
        <View style={{flex: 1,flexDirection: 'column'}}>
        <Text style={{fontSize:20}}>{(this.state.tab_type=='arr') ? this.props.allAirport[item.departureAirportFsCode].city:this.props.allAirport[item.arrivalAirportFsCode].city} {(this.state.tab_type=='arr') ? item.departureAirportFsCode : item.arrivalAirportFsCode} </Text>
          <View style={{flex: 1,flexDirection: 'row'}}>
            <Text style={{fontSize:20}}>{item.carrierFsCode} </Text>
            <Text style={{fontSize:20}}>{item.flightNumber} </Text>
            
          </View >
          
        </View >
        <Text style={{fontSize:20}}>{status[item.status]} </Text>
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
        <View style={{height:40,flexDirection: 'row',justifyContent: 'space-between',
        alignItems: 'center'}} >

          <TouchableOpacity
            style={{height:40,}}
            onPress={this.TabVilet.bind(this,'arr')}
            >
              <Text style={(this.state.tab_type==='arr')? styles.tabYellow:styles.tab}>Arrival</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{height:40,}}
            onPress={this.TabVilet.bind(this,'dep')}
            >
              <Text style={(this.state.tab_type==='dep')? styles.tabYellow:styles.tab}>Departure</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{height:40,}}
            onPress={this.TabVilet.bind(this,'del')}
            >
              <Text style={(this.state.tab_type==='del')? styles.tabYellow:styles.tab}>Delay</Text>
          </TouchableOpacity>

          
        </View >
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
  tab: {fontSize:30,fontWeight: 'bold',},
  tabYellow: {fontSize:30,fontWeight: 'bold',color:'orange'}
});

const mapStateToProps = state => {

	console.log('mapStateToProps', state)
  let storedDogs = state.dogs.map(dog => ({...dog }));
  let storedAllAirport={...state.allAirport};
  let storedCurrentAirport={...state.currentAirport};
  return {
    dogs: storedDogs,
    allAirport:storedAllAirport,
    currentAirport:storedCurrentAirport,
  };
};

const mapDispatchToProps = {
  listDogs,getAirportInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightList);