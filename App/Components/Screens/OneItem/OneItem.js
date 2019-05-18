import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, AsyncStorage, ToastAndroid , ActivityIndicator} from 'react-native';
import { Container, Content, Right, Text, List, Body, Header, ListItem, Left, Button, Footer, FooterTab, CardItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import Head from '../Header/Header';
import Swiper from 'react-native-swiper';
import GetAPI from '../../API/GetMethod';

const { width } = Dimensions.get('window');
const Slider = props => (

    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: props.uri.url }} />
    </View>
)

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 5


    },
    image: {
        flex: 1,
        width,
        height: 200,
        //   resizeMode: 'cover'
    },
    btn: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

    },
    listhead: {
        backgroundColor: '#D4D6D6',
        marginLeft: 0

    },
    listheadText: {
        marginLeft: '32%',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#E55266'

    },
    description: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 12,
        fontFamily: 'Times'
    }

}
const Item = [];




export default class OneItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Product Detail',
            starCount: 2,
            data: [],
            total: '',
            spin:true
        }
    }
    componentWillMount() {
        Item.length = 0;
        let th = this;
        let ItemList = [];
        let productId = th.props.id;
        GetAPI(`/product/getById/?id=${productId}`)
            .then(response => response.json())
            .then((json) => {
                let price = json.data.price;
                let discount = json.data.discount;
                discount = Number(discount)
                discount = discount / 100;
                let actual = (price - (price * discount))
                ItemList.push(json.data)
                th.setState({
                    data: ItemList,
                    total: actual,
                    spin:false
                })

            })
            .catch(err => console.log(err));
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    addToCart(th) {
        AsyncStorage.getItem('card').then((data) => {
            console.log(this.props.addToCart);
            if (data !== null) {
                let d = JSON.parse(data);
                
                let a = d.filter(element => {
                    if (element.product === th.state.data[0]._id) {
                        if(element.quantity >= 5){
                            ToastAndroid.show('Maximum Quantity 5', ToastAndroid.LONG)
                        }else{
                            element.quantity++;
                        }
                        
                        return true;
                    }
                });
                if (!a.length) {
                    let cardItem = {}
                    this.props.addToCart(d.length+1)
                    cardItem.product = th.state.data[0]._id;
                    cardItem.name = th.state.data[0].name;
                    cardItem.picture = th.state.data[0].picture[0].url;
                    cardItem.detail = th.state.data[0].detail;
                    cardItem.discount = th.state.data[0].discount;
                    cardItem.price = th.state.total;
                    cardItem.quantity = 1
                    d.push(cardItem);
                }
                AsyncStorage.setItem('card', JSON.stringify(d));
            }
            else {
                this.props.addToCart(1)
                let cardItem = {}
                cardItem.product = th.state.data[0]._id;
                cardItem.name = th.state.data[0].name;
                cardItem.picture = th.state.data[0].picture[0].url;
                cardItem.detail = th.state.data[0].detail;
                cardItem.discount = th.state.data[0].discount;
                cardItem.price = th.state.total;
                cardItem.quantity = 1
                Item.push(cardItem);
                AsyncStorage.setItem('card', JSON.stringify(Item));
            }
        }).catch(err => console.log(err))




    }
    render() {
        return (
            <Container>
                <Head title={this.state.name} />
                <ScrollView>
                    <Content>
                    {
                                this.state.spin?
                                <ActivityIndicator size={120} color="#E55266" style={{marginTop:160}} />
                            :
                        <View>
                        {
                            this.state.data.map((data, index2) => {
                                return (
                                    <List key={index2} >
                                        <ListItem noBorder style={styles.listhead} >
                                            <Body>
                                                <Text style={styles.listheadText}>
                                                    {data.name} </Text>
                                            </Body>
                                        </ListItem>


                                        <Swiper
                                            height={350}
                                            horizontal={true}
                                            paginationStyle={{ bottom: 1 }}
                                            autoplay
                                        >
                                            {data.picture.map((item, i) => {
                                                return <Slider uri={item} key={i}
                                                />
                                            })
                                            }
                                        </Swiper>

                                        <ListItem noBorder >
                                            <Text style={styles.description} >
                                                {data.detail}
                                            </Text>
                                        </ListItem>

                                        <ListItem noBorder style={{ marginTop: 10, marginBottom: 10 }} >
                                            <Left>
                                                <Text style={{ color: '#E55266', fontWeight: 'bold' }}>{`Rs:${this.state.total}/=`}</Text>
                                            </Left>
                                            <Body>
                                                <Text style={{ textDecorationLine: 'line-through', color: 'lightgray' }} >{`Rs:${data.price}/=`}</Text>
                                            </Body>
                                            <Right >
                                                <Text style={{ color: 'lightgray' }} >{`-${data.discount}%`}</Text>
                                            </Right>
                                        </ListItem>

                                        <TouchableOpacity style={{ width: 120, marginLeft: 15, marginBottom: 30 }} >
                                            <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={this.state.starCount}
                                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                fullStarColor={'#A9A9A9'}
                                                starSize={25}



                                            />
                                        </TouchableOpacity>

                                    </List>
                                )
                            })}
                            </View>
                    }
                    </Content>
                </ScrollView>
                <Footer style={{ backgroundColor: '#E55266', }}   >
                    <Button transparent style={{ width: '100%', height: 60 }} onPress={() => this.addToCart(this)} >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginLeft: '30%' }} >BUY NOW!</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }
}
