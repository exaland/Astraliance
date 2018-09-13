import React, { Component} from 'react'
import { View, Text, StyleSheet , Image, TouchableOpacity} from 'react-native'
import GridView from 'react-native-super-grid';
import style from './Styles/Style'
export default class Horoscopelist extends React.Component {


    static navigationOptions = ({navigation}) => {
        
        return {
            title: `Choisissez votre Signe / ${navigation.state.params.type}`,
            headerStyle: style.header,
            headerTitleStyle: style.headerTitle,
            headerTintColor: '#fff'

        }
    }

    constructor(props) {
        super(props)
            
      }

      getHoroscope(signe,codeHoroscope) {
          console.log('CA MARCHE',signe)
          this.props.navigation.navigate('Details', {type: 'jour', code: codeHoroscope})

      }

    render() {
        const items = [
            { name: 'belier', code: '0', imgurl: require('./Images/signe_belier.png') }, { name: 'balance', code: '1', imgurl: require('./Images/signe_balance.png') },
            { name: 'vierge', code: '2',  imgurl: require('./Images/signe_vierge.png') }, { name: 'verseau', code: '3',  imgurl: require('./Images/signe_verseau.png')  },
            { name: 'taureau', code: '4' , imgurl: require('./Images/signe_taureau.png') }, { name: 'scorpion', code: '5',  imgurl: require('./Images/signe_scorpion.png') },
            { name: 'sagittaire', code: '6', imgurl: require('./Images/signe_sagittaire.png')  }, { name: 'poissons', code: '7' , imgurl: require('./Images/signe_poissons.png')},
            { name: 'lion', code: '8', imgurl: require('./Images/signe_lion.png')  }, { name: 'gemeaux', code: '9',  imgurl: require('./Images/signe_gemeaux.png')  },
            { name: 'capricorne', code: '10', imgurl: require('./Images/signe_capricorne.png')  }, { name: 'cancer', code: '11', imgurl: require('./Images/signe_cancer.png')  },
          ];
      
        return (
         
            <GridView
        itemDimension={130}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer, { backgroundColor: '#34495e' }]}>
          <TouchableOpacity onPress={() => this.getHoroscope(item.name,item.code)}>
            <Image style={[styles.center, {alignItems: 'center'}]} source={item.imgurl} resizeMode='contain' />
            </TouchableOpacity>
          </View>
        )}
      />
           
        )
    }
}

const styles = StyleSheet.create({
    gridView: {
      paddingTop: 25,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
      alignItems: 'center'
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    center: {
        justifyContent: 'center',
        marginTop: 80,
        width: 100,
        height: 150
     
    }
  });

  