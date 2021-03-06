import React from 'react'
import { View, Text, Image , Button, TouchableOpacity} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import  Horoscopelist  from './Horoscopelist'
import Horoscopedetails from './Horoscopedetails'
import  About  from './About'
import { Icon } from 'react-native-elements'
import style from './Styles/Style'
import SliderEntry from './Carousel/components/SliderEntry';
import { sliderWidth, itemWidth } from './Carousel/styles/SliderEntry.style';
import { ENTRIES1 } from './Carousel/static/entries';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styles, { colors } from './Carousel/styles/index.style';

const SLIDER_1_FIRST_ITEM = 1;


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
    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0}  />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
              navigation={this.props.navigation}
              
            />
        );
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
               
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this._renderItemWithParallax.bind(this)}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.7}
                  // inactiveSlideShift={20}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={true}
                  loopClonesPerSide={2}
                  autoplay={true}
                  autoplayDelay={500}
                  autoplayInterval={3000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                
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