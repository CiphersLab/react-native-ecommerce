import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Form, Input, Item, Badge, Thumbnail, Text, List,ListItem } from 'native-base';
import VectorIcon from 'react-native-vector-icons/AntDesign';
import VectorIconTwo from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Head from '../Header/Header';
import GetAPI from '../../API/GetMethod';



export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Search',
            data: [],
            values: ''
        }
    }
   
    searchInput = (text) => {
        this.setState({ values: text })
        setTimeout(() => {
            if (this.state.values === "") {
                this.setState({ data: [] })
            }
            else {
                let searchWord = this.state.values;
                GetAPI(`/product/get/searchProduct/?searchQuery=${searchWord}`).then(res => res.json()).then(json => {
                    this.setState({ data: json.data })
                })
                    .catch(err => console.log(err))
            }
        }, 0)

    }
    getSingleProduct(data){
       Actions.replace('OneItem',{id:data._id})
    }
    render() {
        return (
            <Container>
                <Head title={this.state.name} />
                <Item>
                    <Icon style={{marginLeft:10}} name="ios-search" />
                    <Input placeholder="Search" value={this.state.values} onChangeText={(text) => this.searchInput(text)} />

                </Item>

                <ScrollView>
                    {
                        this.state.data.length === 0 ? <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: '60%', color: 'gray', textAlign: 'center', fontFamily: 'Times', fontSize: 22 }} > NO ITEM FOUND </Text> : <View>
                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} >
                                            <List>
                                                <ListItem avatar onPress={() => this.getSingleProduct(item)} >
                                                    <Left>
                                                        <Thumbnail source={{ uri: item.picture[0].url }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>{item.name}</Text>
                                                        <Text numberOfLines={1} >{item.detail}</Text>
                                                    </Body>
                                                    <Right>
                                                        <Text note>RS= {item.price}/</Text>
                                                    </Right>
                                                </ListItem>
                                            </List>


                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    }
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
