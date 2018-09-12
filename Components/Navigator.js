import { React } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { About } from './About'
import { Horoscopelist } from './Horoscopelist'

const MyNavigator = createStackNavigator({

    Home: { screen: About },
    List: { screen: About}


});

export default MyNavigator;
