import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Slider,ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Picker, Container, Footer } from 'native-base';
import Head from '../Header/Header';
import StarRating from 'react-native-star-rating';
import GetAPI from '../../API/GetMethod';






export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'Filter',
            price: 0,
            dicount: 0,
            starCount:null,
            category:'',
            spin:false

        }
    }
    getVal(val) {
        console.log(val);
    }
    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
   componentWillMount(){
       this.setState({
        category:this.props.ID
       })
   }
   filter(th){
    th.setState({spin:true})
    let maxPrice = th.state.price;
    let discount = th.state.dicount;
    let category = th.state.category;
    let rating =   th.state.starCount;
    GetAPI(`/product/get/custom?maxPrice=${maxPrice}&discount=${discount}&rating=${rating}&category=${category}`)
    .then(response => response.json())
    .then((json) => {
        console.log(json);
        th.setState({price:0,dicount:0,starCount:null, spin:false})
    })
    .catch(err => console.log(err))
   }
    render() {
        return (
            <Container>
                <Head title={this.state.name} />
                <ScrollView  >
                {
                                this.state.spin?
                                <ActivityIndicator size={120} color="#E55266" style={{marginTop:160}} />
                            :
                    <View>
                        <View style={{ marginTop: 20, marginLeft: 20, flex: 1, flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Times', fontSize: 16 }} >Brand</Text>
                        </View>
                        <View style={{ marginTop: 40, marginLeft: 20, flex: 1, flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Times', fontSize: 16 }}>Price</Text>
                            <Text style={{ marginLeft: 60, marginTop: 1 }} >Rs 0</Text>
                            <Slider
                                style={{ width: 160, marginTop: -4 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={50000}
                                value={this.state.price}
                                onValueChange={val => this.setState({ price: val })}
                                onSlidingComplete={val => this.getVal(val)}
                            />
                            <Text style={{ marginTop: 1 }} >{this.state.price}</Text>
                        </View>
                        <View style={{ marginTop: 40, marginLeft: 20, flex: 1, flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Times', fontSize: 16 }}>Discount</Text>
                            <Text style={{ marginLeft: 40, marginTop: 1 }} >0%</Text>
                            <Slider
                                style={{ width: 160, color: 'black', marginTop: -4 }}
                                step={1}
                                minimumValue={0}
                                maximumValue={100}
                                value={this.state.dicount}
                                onValueChange={val => this.setState({ dicount: val })}
                                onSlidingComplete={val => this.getVal(val)}
                            />
                            <Text style={{ marginTop: 1 }} >{this.state.dicount}{'%'}</Text>
                        </View>
                        <View style={{ marginTop: 40, flex: 1, flexDirection: 'row' }} >
                            <Text style={{ fontFamily: 'Times', fontSize: 16, flexDirection: 'column', marginLeft: 20, width: 160, }}>Rating</Text>
                            <View style={{ flex: 1, flexDirection: 'column', marginRight: 20 }} >
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    fullStarColor={'#A9A9A9'}
                                    starSize={25}


                                />
                            </View>
                        </View>
                    </View>
                }
                </ScrollView>
                <Footer style={{ backgroundColor: '#E55266', }}  >
                <Button transparent style={{ width: '100%', height: 60 }} onPress={() => this.filter(this)} >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 25, marginLeft: '30%' }} >APPLY NOW!</Text>
                </Button>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({



})