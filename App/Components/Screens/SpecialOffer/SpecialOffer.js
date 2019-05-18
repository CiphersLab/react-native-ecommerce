import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, } from 'react-native';
import { Container, Content, Right, Text, List, Body, Header, Title, } from 'native-base';
import { Actions } from 'react-native-router-flux';






export default class SpecialOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {

        return (
            <View>
                <ScrollView>
                    <Content>
                        <TouchableOpacity style={{flex:1,flexDirection:'row', marginTop:10,marginBottom:10}} >
                        <View style={{flexDirection:'column'}} >
                            <Text style={{fontFamily:'cursive', fontSize:18, color:'#000000', marginLeft:18, fontWeight:'bold', marginTop:40}} >Eid Special Discount</Text>
                            <Text style={{fontFamily:'Times', fontSize:11, color:'#000000', marginLeft:18, marginTop:15, textAlign:'center'}} >Up to 80% Off</Text>
                            </View>
                            <View style={{flexDirection:'column', marginLeft:20}}>
                            <Image style={{ width: 160, height: 140, resizeMode: 'cover'}} source={require('../../images/Eid.jpg')} />
                            </View>
                        </TouchableOpacity>
                    </Content>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({


})