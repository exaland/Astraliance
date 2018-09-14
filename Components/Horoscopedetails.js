import React, { Component} from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Rating , Divider} from 'react-native-elements'
import axios from 'axios'
import style from './Styles/Style'
import moment from 'moment'
const BASE_URL = 'http://www.astraliance.fr/wp-json/horoscope/v1/fr/week-end'
let days = '';
const { ratingAmourC, ratingAmourCouple, ratingSocial, ratingLoisir } =''
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
            horosNew: [],
            horoscope: this.props.navigation.state.params.type,
            codeHoroscope: this.props.navigation.state.params.code
        }
       
        console.log('HOROSCOPE', this.props.navigation.state.params.type)
        console.log('CODE HOROSCOPE', this.props.navigation.state.params.signe)
        this.fetchHoroscope(this.props.navigation.state.params.signe);
        this.date();
      }



    fetchHoroscope(codes) {
        axios.get(BASE_URL)
        .then((response) => {
          
            var val = "cancer"
            var index = response.data.findIndex(function(item,i) {
                return item.sign === codes
            })
            console.log(index)
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
            <ScrollView maximumZoomScale={4} minimumZoomScale={0.25} bouncesZoom={true} style={style.scrollViewHoroscope}>
            <View style = { style.viewHoroscope} >

            <Image source={signeImage[this.props.navigation.state.params.code].imgurl } />
            <Text style={style.textDate}>DATE : {this.date()}</Text>
            </View>
            <Text style={style.signeAmour}>AMOUR (Celibataire) Résumé</Text>
            <Text style={style.textHoroscopeResume}>{this.state.horos['hw_resume-amour-celibataire']}</Text>
            <Text style={style.signeAmour}>AMOUR (Celibataire)</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-celibataire']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE :</Text>
            <Rating
                type="heart"
                fractions={1}
                startingValue={ratingAmourC}
                readonly
                imageSize={30}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
             <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeAmour}>AMOUR (Couple)</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_amour-couple']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE :</Text>
            <Rating
                type="heart"
                fractions={1}
                startingValue={ratingAmourCouple}
                readonly
                imageSize={30}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeSocial}>SOCIAL Résumé</Text>
            <Text style={style.textHoroscopeResume}>{this.state.horos['hw_resume-social']}</Text>
            <Text style={style.signeSocial}>SOCIAL</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_social']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE :</Text>
            <Rating
                type="heart"
                fractions={1}
                startingValue={ratingSocial}
                readonly
                imageSize={30}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeLoisir}>LOISIR Résumé</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_resume-loisir']}</Text>
            <Text style={style.signeLoisir}>LOISIR</Text>
            <Text style={style.textHoroscope}>{this.state.horos['hw_loisir']}</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.textDate}>NOTE :</Text>
            <Rating
                type="heart"
                fractions={1}
                startingValue={ratingLoisir}
                readonly
                imageSize={30}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10, alignItems: 'center'}}
                />
            <Divider style={{ backgroundColor: 'blue' }} />
            <Text style={style.signeLoisir}>LOISIR</Text>
            </ScrollView>
        )
    }
}