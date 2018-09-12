import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import Horoscopetype from './Components/Horoscopetype'
import About from './Components/About'
import { createBottomTabNavigator } from 'react-navigation'


const Tabs = createBottomTabNavigator({
  Horoscopes: Horoscopetype,
  About: About

},{
tabBarOptions: {
  activeTintColor: 'white',
  inactiveTintColor: 'gray',
  showIcon: true,
  showLabel: true,
  indicatorStyle: {
    height: 2,
    backgroundColor: '#FFF'
  },
  style: {
    backgroundColor: "#160a38",
    borderTopWidth: 1,
    borderColor: "#FFF"

  }
}})

export default class App extends React.Component {

  static propTypes = {
    types: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = { html: '', amour: null, sign: null }
  }


  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar hidden={true}/>
      <Tabs />
      </View>
      
    )
  }
}

