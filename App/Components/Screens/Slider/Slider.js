import React, { Component } from 'react';
import { Text, View, Dimensions, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import GetAPI from '../../API/GetMethod';

const { width } = Dimensions.get('window');
const Slider = props => (

    <View style={styles.container}>
        <Image style={styles.image} source={props.uri} />
    </View>
)

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    image: {
        flex: 1,
        width,
        height: 200,
        resizeMode:'cover'
    },

}

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSlider: [
                require('../../images/furniture.jpg'),
                require('../../images/livingroom.jpg'),
                require('../../images/clothes.jpg'),
                require('../../images/toys.jpg'),
            ]
        }
    }
   
    render() {

        return (
            <View  >
                <ScrollView>
                    <Swiper
                        height={250}
                        horizontal={true}
                        paginationStyle={{ bottom: 1 }}
                       // autoplay
                    >
                        {this.state.imageSlider.map((item, i) => {
                            return <Slider uri={item} key={i}
                            />
                        })
                        }
                    </Swiper>
                </ScrollView>
            </View>
        );
    }
}


