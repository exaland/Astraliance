import React, { Component} from 'react'
import { View, Text, ListView } from 'react-native'
import axios from 'axios'

const BASE_URL = 'http://www.astraliance.fr/wp-json/horoscope/v1/fr/week-end'

export default class Horoscopedetails extends React.Component {


    static navigationOptions = {
        title: 'Votre Horoscope'
    }

    constructor(props) {
        super(props)
        this.state = {
            horos: [],
            horoscope: this.props.navigation.state.params.type,
            codeHoroscope: this.props.navigation.state.params.code
        }
        console.log('HOROSCOPE', this.props.navigation.state.params.type)
        console.log('CODE HOROSCOPE', this.props.navigation.state.params.code)
        this.fetchHoroscope(this.props.navigation.state.params.code);

      }

    fetchHoroscope(codes) {
        axios.get(BASE_URL)
        .then((response) => {
            this.setState({horos: response.data[codes]})
           

        })
    }  

    render() {
        return (
            <View>
            <Text>{this.state.horos.sign}</Text>
            </View>
        )
    }
}