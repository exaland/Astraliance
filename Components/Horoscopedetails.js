import React, { Component} from 'react'
import { View, Text, ScrollView, Image, Alert, RefreshControl } from 'react-native'
import { Rating , Divider} from 'react-native-elements'
import DropdownAlert from 'react-native-dropdownalert'
import axios from 'axios'
import style from './Styles/Style'
import moment from 'moment'
const BASE_URL = 'http://www.astraliance.fr/wp-json/horoscope/v1/fr/'
const URL_API = ''
let days = '';
const { ratingAmourC, ratingAmourCouple, ratingSocial, ratingLoisir } = 0
export default class Horoscopedetails extends React.Component {


    static navigationOptions = {
        title: 'Votre Horoscope',
        headerStyle: style.header,
        headerTitleStyle: style.headerTitle,
        headerTintColor: '#fff'
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

      }
      showError = (message) => {
        this.dropdown.alertWithType('error', 'Error', message)
      }
    
      componentWillMount() {
        this.fetchHoroscope(this.props.navigation.state.params.signe);
        this.date();

      }
      

      _onRefresh = () => {
        this.setState({refreshing: true});
        //Fonction a ajouter pour le Rafraichissiment de l'écran
        this.setState({refreshing: false});
       

        }

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
                {text: 'Annuler', onPress: () => this.props.navigation.navigate('Type'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.navigation.navigate('Type')},
            ],
            { cancelable: false}
            )
        })
    }  

    date() {
        day = moment(days * 1000).format('DD/MM')
       return (
           <Text> { day } </Text>
       )
    }

    rating(noteType) {
        return (
        <Rating
                type="heart"
                fractions={1}
                startingValue={noteType}
                readonly
                imageSize={30}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
        )

    }

    render() {

        const signeImage = [
            { name: 'belier', code: '0', imgurl: require('./Images/signe_belier.png') }, { name: 'balance', code: '1', imgurl: require('./Images/signe_balance.png') },
            { name: 'vierge', code: '2',  imgurl: require('./Images/signe_vierge.png') }, { name: 'verseau', code: '3',  imgurl: require('./Images/signe_verseau.png')  },
            { name: 'taureau', code: '4' , imgurl: require('./Images/signe_taureau.png') }, { name: 'scorpion', code: '5',  imgurl: require('./Images/signe_scorpion.png') },
            { name: 'sagittaire', code: '6', imgurl: require('./Images/signe_sagittaire.png')  }, { name: 'poissons', code: '7' , imgurl: require('./Images/signe_poissons.png')},
            { name: 'lion', code: '8', imgurl: require('./Images/signe_lion.png')  }, { name: 'gemeaux', code: '9',  imgurl: require('./Images/signe_gemeaux.png')  },
            { name: 'capricorne', code: '10', imgurl: require('./Images/signe_capricorne.png')  }, { name: 'cancer', code: '11', imgurl: require('./Images/signe_cancer.png')  },
          ];
        return (
            <ScrollView refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh} />} maximumZoomScale={4} minimumZoomScale={0.25} bouncesZoom={true} style={style.scrollViewHoroscope}>
            <View style = { style.viewHoroscope} >
                
            <Image source={signeImage[this.props.navigation.state.params.code].imgurl } />
            <Text style={style.textDate}>DATE : {this.date()}</Text>
            </View>
            <Text style={style.signeAmour}>AMOUR (Celibataire) Résumé</Text>
            <Text style={style.textHoroscopeResume}>{this.state.horos['hw_resume-amour-celibataire']}</Text>
            <Text style={style.signeAmour}>AMOUR (Celibataire)</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-celibataire']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE Amour (Célibataire) :</Text>
            {this.rating(ratingAmourC)}
             <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeAmour}>AMOUR (Couple)</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-couple']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE Amour (Couple) :</Text>
            {this.rating(ratingAmourCouple)}
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeSocial}>SOCIAL Résumé</Text>
            <Text style={style.textHoroscopeResume}>{this.state.horos['hw_resume-social']}</Text>
            <Text style={style.signeSocial}>SOCIAL</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_social']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE Social :</Text>
            {this.rating(ratingSocial)}
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeLoisir}>LOISIR Résumé</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_resume-loisir']}</Text>
            <Text style={style.signeLoisir}>LOISIR</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_loisir']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE Loisir :</Text>
            {this.rating(ratingLoisir)}
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeLoisir}></Text>
            <DropdownAlert ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />

            </ScrollView>
        )
    }
}