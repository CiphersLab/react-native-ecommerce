import React, { Component } from 'react';
import {  View } from 'react-native';
import { Header, Left, Right,  Title, Body } from 'native-base';
import VectorIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';





export default class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    close() {
        Actions.pop();
    }
    render() {

        return (
            <View>
                <Header style={{ backgroundColor: '#E55266', }}
                    androidStatusBarColor="#E55266">

                    <Body  >

                        <Title style={{fontSize:18, fontFamily:'Times'}} >{this.props.title}</Title>
                    </Body>
                    <Right >
                        <VectorIcon name="cross" size={25} color="#fff" onPress={this.close} />
                    </Right>

                </Header>
            </View>
        );
    }
}


