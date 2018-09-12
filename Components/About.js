import React from 'react'
import { View, Text, Image , Button, StyleSheet} from 'react-native'
import Horoscopelist from './Horoscopelist'
import { createStackNavigator } from 'react-navigation'
export default class About extends React.Component {

    static navigationOptions = {
        tabBarIcon: () => {
           return <Image source={require ('./Icons/information.png')} />
        },
        title: 'A Propos..'
    }

    horoscope() {
        this.props.navigation.navigate('Horoscopes')
    }

    render() {
        return (
            <View style={styles.view}>
                <Text style={styles.title}>A Propos...</Text>
                <Text>
                    Ici la description de l'application
                </Text>
                <Button onPress={() => this.horoscope()} title="Test"></Button>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
        margin: 20
    },
    title: {
        fontSize: 22,
        marginBottom: 20
    }
  });


  