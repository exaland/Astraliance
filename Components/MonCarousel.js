import React from 'react'
import { View , Text, StyleSheet, Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { createStackNavigator } from 'react-navigation'
import { About } from './About'
import { Horoscopelist } from './Horoscopelist'
export const sliderWidth = viewportWidth;
export const itemHorizontalMargin = 2;
export const itemWidth = slideWidth + itemHorizontalMargin ;
const entryBorderRadius = 3;
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const slideHeight = viewportHeight * 0.35;
const slideWidth = 82;
export default class MonCarousel extends React.Component {

    constructor(props) {
        super(props)
        this._renderItem({title: 'kkk'})
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{ 'eee' }</Text>
            </View>
        );
    }

    render () {
        return (
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={{item:'rerr'}}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
        );
    }



}

const styles = StyleSheet.create({
    slider: {
        marginTop: 16
      },
      sliderContainer: {
      },
    
      slideInnerContainer: {
        width: itemWidth,
        height: slideHeight,
      },
    
      imageContainer: {
        borderRadius: entryBorderRadius,
        height: viewportHeight * 0.25,
        margin: itemHorizontalMargin,
    
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 12},
        elevation: 10
      },
      image: {
        resizeMode: 'cover',
        width: viewportWidth * 0.8,
        height: viewportHeight * 0.25,
        borderRadius: entryBorderRadius,
      },
      title: {
        color: '#999',
        marginBottom: 4,
        fontSize: 14,
        letterSpacing: 2.5,
        textAlign: 'center',
      },


})