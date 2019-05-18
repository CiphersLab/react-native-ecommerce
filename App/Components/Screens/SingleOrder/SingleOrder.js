import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Container, Content, Right, Text, List, Body, Header, Title, } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import VectorIcon from 'react-native-vector-icons/Entypo';
import VectorIconTwo from 'react-native-vector-icons/FontAwesome';
import Head from '../Header/Header';






export default class SingleOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Single Order Item',
            data: [],
            spin:true
        }
    }
    componentWillMount() {
        this.setState({
            data: this.props.data,
            spin:false
        })
    }
    dateset = (dates) =>{
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December']
        let getMonth = dates.slice(5,7)
        getMonth = getMonth - 1;
        var gtMon;
        for(var i = 0; i < month.length; i++){
            if(i == getMonth){
                gtMon = month[i]
            }
            
        }
        let year = dates.slice(0,4);
        let day = dates.slice(8,10)
        return day+' '+gtMon+' '+ year
    }
    Timeset = (times) => {
        var d = new Date(times);
        var hou = d.getHours();
        var m = d.getMinutes();
        var second = d.getSeconds();
        var time = (hou + ':' + m + ':' + second).toString()
        var H = +time.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "AM" : "PM";
        time = h + time.substr(2, 3) +" "+ ampm;
        return time
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
                        <List>
                            <TouchableOpacity noBorder style={{ backgroundColor: '#F0F5F7', marginBottom: 20 }} >
                                <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'column' }} >
                                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12, marginTop: 10 }}>
                                            <VectorIconTwo name="user-circle" size={18} color="#418FB6" />
                                            <Text style={{ fontSize: 12, color: '#E55266', marginLeft: 5, fontWeight: 'bold' }}>{this.state.data.user.name}</Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 14 }} >
                                    <View style={{ flex: 1, flexDirection: 'column' }} >
                                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                                            <Icon name="date-range" size={20} color="#418FB6" />
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E55266' }}>{this.dateset(this.state.data.orderTime.slice(0, 10))}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'column', marginRight: 10 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Icon name="access-time" size={20} color="#418FB6" />
                                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E55266' }}>
                                            {this.Timeset(this.state.data.orderTime)}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'column' }} >
                                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 12 }}>
                                            <VectorIcon name="home" size={14} color="#418FB6" />
                                            <Text style={{ fontSize: 12, color: '#E55266', marginLeft: 5 }}>{this.state.data.deliveryAddress}</Text>
                                        </View>
                                    </View>

                                </View>
                            </TouchableOpacity>



                        </List>
                        <List>
                            {this.state.data.products.map((data, index) => {
                                return (

                                    <TouchableOpacity key={index} noBorder style={{ backgroundColor: '#F0F5F7', marginBottom: 10 }} >

                                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginTop: 14 }} >
                                            <View style={{ flex: 1, flexDirection: 'column' }} >
                                       
        
                                                    <Image source={{uri:data.product.picture[0].url}} style={styles.img} />
                                                
                                            </View>

                                        
                                        <View style={{flex: 1,flexDirection: 'column', marginLeft: 15, marginRight: 15, marginBottom: 20 }} >
                                            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', fontFamily: 'roboto' }} >{data.product.name}</Text>
                                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Times', marginBottom: 5, marginTop: 5 }}>QTY: {data.quantity}</Text>
                                            <Text style={{ color: '#E55266', fontSize: 14, fontFamily: 'Times', marginBottom: 5, marginTop: 5 }}>Rs: {data.price}</Text>
                                            <Text style={{ color: 'black', fontSize: 11, fontFamily: 'serif' }}>{data.product.detail}</Text>
                                        </View>
                                        </View>
                                    </TouchableOpacity>


                                )
                            })}

                        </List>
                        </View>
                        }
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        width: 120,
        height: 100,
        marginLeft:20,
        resizeMode: 'cover',
    },

})