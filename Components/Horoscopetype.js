import React from 'react'
import { View, Text, Image , Button, TouchableOpacity} from 'react-native'
import  Horoscopelist  from './Horoscopelist'
import Horoscopedetails from './Horoscopedetails'
import  About  from './About'
import style from './Styles/Style'
import { createStackNavigator } from 'react-navigation'
class Horoscopetype extends React.Component {

    
    static navigationOptions = {
        title: 'Choisissez votre Horoscope',
        headerStyle: style.header,
        headerTitleStyle: style.headerTitle,
        headerTintColor: '#fff',
        tabBarIcon: () => {
           return <Image source={require ('./Icons/home.png')} />
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            type: 'Week-End'
        }
    }

    submitDay () {
        this.props.navigation.navigate('Liste', {type: 'jour'})
    }

    submitWeek () {
        this.props.navigation.navigate('Liste', {type: 'week'})
    }

    submitWeekEnd () {
        this.props.navigation.navigate('Liste', {type: 'week-end'})
    }



    render() {
        return (
            <View style={{justifyContent: 'center',alignItems:'center'}}>
                <Image style={{backgroundColor: '#160a38',marginTop:20,marginBottom: 40}} source={require ('./Images/logo_blanc.png')} />
                <TouchableOpacity style={style.button} onPress={() => this.submitDay() }>
                <Text style={style.buttontitle}> HOROSCOPE DU JOUR </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={() => this.submitWeek() }>
                <Text style={style.buttontitle}> HOROSCOPE DE LA SEMAINE </Text>

                </TouchableOpacity>
                <TouchableOpacity style={style.button} onPress={() => this.submitWeekEnd() }>
                <Text style={style.buttontitle}> HOROSCOPE DU WEEK-END </Text>

                </TouchableOpacity>
            </View>

        )
    }
}

export default createStackNavigator({
 
    Type: {
        screen: Horoscopetype
       
    },
    Liste: {
        screen: Horoscopelist
    },
    Details: {
        screen: Horoscopedetails
    }
  
   
  });