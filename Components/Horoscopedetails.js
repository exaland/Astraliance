import React, { Component} from 'react'
import { View, Text, ScrollView, Image, Alert, RefreshControl, Button } from 'react-native'
import { Rating , Divider, Icon} from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import DropdownAlert from 'react-native-dropdownalert'
import axios from 'axios'
import style from './Styles/Style'
import moment from 'moment'
const BASE_URL = 'http://www.astraliance.fr/wp-json/horoscope/v1/fr/'
const URL_API = ''
let days = '';
let TYPE_API;
const STARS_ICON = require('../Components/Icons/star.png')
const { ratingAmourC, ratingAmourCouple, ratingSocial, ratingLoisir } = 0

export default class Horoscopedetails extends React.Component {


    static navigationOptions = {
        title: 'Votre Horoscope',
        headerStyle: style.header,
        headerTitleStyle: style.headerTitle,
        headerTintColor: '#fff',
        headerBackTitle: 'Retour'
    }

    constructor(props) {
        super(props)
        this.state = {
            horos: [],
            refreshing:false,
            horoscope: this.props.navigation.state.params.type,
            codeHoroscope: this.props.navigation.state.params.code
        }
        URL_API = BASE_URL + this.props.navigation.state.params.type
        console.log('HOROSCOPE', this.props.navigation.state.params.type)
        console.log('CODE HOROSCOPE', this.props.navigation.state.params.signe)
        TYPE_API = this.props.navigation.state.params.type;
        console.log('TYPE API',TYPE_API);
        this.fetchHoroscope(this.props.navigation.state.params.signe);
        this.date();

      }
      showError = (message) => {
        this.dropdown.alertWithType('error', 'Error', message)
      }
      
      _onRefresh = () => {
        this.setState({refreshing: true});
        //Fonction a ajouter pour le Rafraichissiment de l'écran
        this.setState({refreshing: false});
       

        }
/**
 *  fetchHoroscope(codes)
 *  Parse the Horoscope from client server (wp)
 *  params: codes horoscope
 */
    fetchHoroscope(codes) {
        axios.get(URL_API)
        .then((response) => {

            var index = response.data.findIndex(function(item,i) {
                return item.sign === codes
            })
            this.setState({horos: response.data[index]})
            days = this.state.horos['date'];
            ratingAmourC = parseInt(this.state.horos['hw_note-amour-celibataire'],10);
            ratingAmourCouple = parseInt(this.state.horos['hw_note-amour-couple'],10);
            ratingSocial = parseInt(this.state.horos['hw_note-social'],10);
            ratingLoisir = parseInt(this.state.horos['hw_note-loisir'],10);
        

        }).catch((error) => {
            return Alert.alert ('Problème Horoscope', 'Il y a un problème avec le Serveur',
            
            [
                {text: 'Annuler', onPress: () => this.goToHome(), style: 'cancel'},
                {text: 'OK', onPress: () => this.goToHome()},
            ],
            { cancelable: false}
            )
        })
    }  

    date() {
        idLocale = require('moment/locale/fr');
        moment.updateLocale('fr',idLocale);
        day = moment(days * 1000).format('dddd Do MMMM YYYY')
       return (
           <Text> { day } </Text>
       )
    } 
    
    goToHome() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Type'})],
        });
        this.props.navigation.dispatch(resetAction);

    }

    goToSigne(types) {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Liste', params: { type: types}})],
        });
        this.props.navigation.dispatch(resetAction);

    }

    buttonTypeSigne() {
        if (TYPE_API === 'week-end') {
            return (
                <View>
                <Button  onPress={() => this.goToSigne('jour')} color='#160a38' title='Hororoscope du Jour'></Button>
                <Divider></Divider>
                <Button onPress={() => this.goToSigne('week')} color='#160a38' title='Hororoscope de la Semaine'></Button>
                </View>

            ) 
        } else if (TYPE_API === 'jour') {
            return (
                <View style={style.button}>
                <Button style={style.button} onPress={() => this.goToSigne('week')} color='#160a38' title='Horoscope de la Semaine'></Button>
                <Button onPress={() => this.goToSigne('week-end')} color='#160a38' title='Horoscope du Week-End'></Button>
                </View>
            ) 
        } else if (TYPE_API === 'week') {
            return (
                <View>
                <Button onPress={() => this.goToSigne('jour')} color='#160a38' title='Hororoscope du Jour'></Button>
                <Button onPress={() => this.goToSigne('week-end')} color='#160a38' title='Hororoscope du Week-End'></Button>
                </View>
            ) 
        }
    }

    rating(noteType,couleurs) {
        return (
        <Rating
                type="custom"
                ratingImage={STARS_ICON}
                fractions={1}
                startingValue={noteType}
                readonly
                imageSize={20}
                ratingBackgroundColor={couleurs}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
        )

    }

    render() {

        const signeImage = [
            { name: 'belier', code: '0', imgurl: require('./Images/signe_belier.png'),couleurtheme: '#00a2e0' }, { name: 'balance', code: '1', imgurl: require('./Images/signe_balance.png'),couleurtheme: '#f39432' },
            { name: 'vierge', code: '2',  imgurl: require('./Images/signe_vierge.png'),couleurtheme: '#ed6ea7' }, { name: 'verseau', code: '3',  imgurl: require('./Images/signe_verseau.png'),couleurtheme: '#adb144'  },
            { name: 'taureau', code: '4' , imgurl: require('./Images/signe_taureau.png'),couleurtheme: '#ea5045' }, { name: 'scorpion', code: '5',  imgurl: require('./Images/signe_scorpion.png'),couleurtheme: '#cd80b4' },
            { name: 'sagittaire', code: '6', imgurl: require('./Images/signe_sagittaire.png'),couleurtheme: '#9d9d9c'  }, { name: 'poissons', code: '7' , imgurl: require('./Images/signe_poissons.png'),couleurtheme: '#61c2d0'},
            { name: 'lion', code: '8', imgurl: require('./Images/signe_lion.png'),couleurtheme: '#cb6e33'  }, { name: 'gemeaux', code: '9',  imgurl: require('./Images/signe_gemeaux.png'),couleurtheme: '#a79dcc'  },
            { name: 'capricorne', code: '10', imgurl: require('./Images/signe_capricorne.png'),couleurtheme: '#F39331'  }, { name: 'cancer', code: '11', imgurl: require('./Images/signe_cancer.png'),couleurtheme: '#a1c748'  },
          ];
        return (
            <ScrollView refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />} maximumZoomScale={4} minimumZoomScale={0.25} bouncesZoom={true} style={style.scrollViewHoroscope}>
            <View style = { style.viewHoroscope} >
                
            <Image source={signeImage[this.props.navigation.state.params.code].imgurl } />
            <Text style={style.textDate}>DATE : {this.date()}</Text>
            </View>
            <View style={[style.signeTest, {backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }]}>
            <Icon  name='heart' color='#ffffff' type='font-awesome' />
            <Text style={style.texteTitre}> Amour (Célibataire)  </Text>
            {this.rating(ratingAmourC,signeImage[this.props.navigation.state.params.code].couleurtheme)}
            </View>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-celibataire']}</Text>
            <Divider style={{ backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }} />
            <View style={[style.signeTest, {backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }]}>
            <Icon  name='heart' color='#ffffff' type='font-awesome' />
            <Text style={style.texteTitre}> Amour (Couple)  </Text>
            {this.rating(ratingAmourCouple,signeImage[this.props.navigation.state.params.code].couleurtheme)}
            </View>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-couple']}</Text>
            <Divider style={{ backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }} />
            <View style={[style.signeTest, {backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }]}>
            <Icon  name='users' color='#ffffff' type='font-awesome' />
            <Text style={style.texteTitre}> Social  </Text>
            {this.rating(ratingSocial,signeImage[this.props.navigation.state.params.code].couleurtheme)}
            </View>
            <Text style={style.textHoroscope}>{this.state.horos['hw_social']}</Text>
            <Divider style={{ backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }} />
            <View style={[style.signeTest, {backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }]}>
            <Icon  name='soccer-ball-o' color='#ffffff' type='font-awesome' />
            <Text style={style.texteTitre}> Loisir  </Text>
            {this.rating(ratingLoisir,signeImage[this.props.navigation.state.params.code].couleurtheme)}
            </View>
            <Text style={style.textHoroscope}>{this.state.horos['hw_loisir']}</Text>
            <Divider style={{ backgroundColor: signeImage[this.props.navigation.state.params.code].couleurtheme }} />
            <Text style={style.signeLoisir}></Text>
            <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />
            <View style={style.container}>
            {this.buttonTypeSigne()}
            </View>
            </ScrollView>
        )
    }
}