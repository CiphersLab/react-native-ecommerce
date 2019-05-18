import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, Text, List, Body, Button, ListItem, Left, Input, Picker, Right, Card } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Head from '../Header/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




export default class Cart extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            name: 'Cart',
            selected: "",
            data: [],
            Price: 0
        }
    }
    checkout = () => {
        let price = this.state.Price;
        AsyncStorage.setItem('Price', JSON.stringify(price))
        AsyncStorage.getItem('Token').then((token) => {
          let tokenID = JSON.parse(token)
          if(tokenID){
              Actions.CheckOut();
          }
          else{
              Actions.AuthTabs();
          }
        }).catch(err => console.log(err) )
    }

    onValueChange(id, quantity) {
        AsyncStorage.getItem('card').then((data) => {
            if (data !== null) {
                let d = JSON.parse(data);
                let a = d.filter(element => {
                    if (element.product === id) {
                        element.quantity = quantity;
                        return true;
                    }
                });
                AsyncStorage.setItem('card', JSON.stringify(d));
                this.setTotalprice(d)
                this.setState({
                    data: d
                })
            }
        })
    }
    delete(Itemdata){
        var IndexNumber;
        AsyncStorage.getItem('card').then((data) => {
            if(data !== null){
                let d = JSON.parse(data);
                let a = d.map((element, index) => {
                    if (element.product === Itemdata.id) {
                        IndexNumber = index
                        return true;
                    }
                });
                d.splice(IndexNumber,1)
                AsyncStorage.setItem('card', JSON.stringify(d));
                this.props.addToCart(d.length)
                this.setTotalprice(d)
                this.setState({
                    data: d
                })
            }
        })
    }
    componentWillMount() {
        this._isMounted = true; 
        AsyncStorage.getItem('card').then((data) => {
           if(data !== null){
            let calculate = JSON.parse(data);
            this.setTotalprice(calculate)

            this.setState({ data: JSON.parse(data) })
           }else{
               console.log('Data',JSON.parse(data))
           }
        }).catch(err => console.log(err))
    }
componentWillUnmount(){
    this._isMounted = false;
}
    setTotalprice(data) {
        var getTotal = 0;
        if(data !== null){
        data.map(item => {
            getTotal += (item.quantity * item.price)
        });
        this.setState({ Price: getTotal })
    }
    }
    render() {
        return (
            <Container>
                <Head title={this.state.name} />
                <ScrollView>
                    {this.state.data.length === 0 ?
                        <Text style={{ justifyContent: 'center', alignItems: 'center', marginTop: '60%', color: 'gray', textAlign: 'center', fontFamily: 'Times', fontSize: 22 }} >No Item Available</Text>
                        :
                        <Content>
                            {this.state.data.map((item, index) => {

                                return (
                                    <View key={index} style={{backgroundColor:'#F8F8FF', marginBottom:10}} >

                                        <List>
                                            <ListItem noBorder  >
                                                <Left>
                                                    <Text style={{marginLeft: 12,fontWeight:'bold',color:'#E55266'}}>
                                                        {item.name.toUpperCase()}
                                                    </Text>
                                                <Right  >
                                                   <Icon name="delete" color="#E55266" size={25} onPress={this.delete.bind(this, item)} />
                                                </Right>
                                                </Left>

                                            </ListItem>

                                        </List>
                                        <View style={{ flex: 1, flexDirection: 'row' }} >
                                            <View style={{ flexDirection: 'column' }} >
                                                <Image source={{ uri: item.picture }} style={styles.img}   />
                                            </View>
                                            <View style={{ flexDirection: 'column', marginRight: 160, }}>
                                                <Text numberOfLines={1} style={{ marginTop: 2, marginLeft: 5, fontSize: 11, fontFamily: 'monospace', color: 'black' }} >{item.detail}</Text>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row' }} >
                                            <View style={{ flexDirection: 'column' }}>
                                                <Picker
                                                    note
                                                    mode="dropdown"
                                                    selectedValue={item.quantity}
                                                    style={{ width: 100, marginLeft: 100, marginRight: '2%', color: 'green', marginBottom: 1, marginTop:-35 }}
                                                    onValueChange={this.onValueChange.bind(this, item.product)}
                                                    itemStyle={{ color: 'green' }}
                                                >

                                                    <Picker.Item label="1" value={1} />
                                                    <Picker.Item label="2" value={2} />
                                                    <Picker.Item label="3" value={3} />
                                                    <Picker.Item label="4" value={4} />
                                                    <Picker.Item label="5" value={5} />
                                                </Picker>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginLeft: 70, marginTop: -16 }}>

                                                <Text style={{ fontSize: 12, color: 'blue' }} >
                                                    {item.quantity * item.price}
                                                </Text>
                                            </View>
                                        </View>

                                    </View>
                                )
                            })}
                            <List>



                                <ListItem noBorder style={styles.listhead}>
                                    <Text style={styles.listheadText}>
                                        COUPON
                        </Text>
                                </ListItem>
                                <ListItem noBorder >

                                    <Input placeholder="Enter Coupon" placeholderTextColor="#D3D3D3" />


                                    <Body>
                                        <Button style={{ marginLeft: 60 }} transparent >
                                            <Text style={{ color: 'blue', fontSize: 13, fontFamily: 'sans-sarif' }} >USE</Text>
                                        </Button>
                                    </Body>
                                </ListItem>
                                <ListItem noBorder style={styles.listhead} >
                                    <Text style={styles.listheadText}  >
                                        TOTAL
                                    </Text>
                                </ListItem>
                                <ListItem noBorder >
                                    <Left>

                                        <Text style={styles.txtColor} >
                                            Total
                                    </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.txtColorStyle}>
                                            {this.state.Price}
                                        </Text>
                                    </Right>
                                </ListItem>
                            </List>
                            <Button success onPress={this.checkout} style={styles.btn} ><Text>Continue</Text></Button>
                        </Content>
                    }
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    },
    listhead: {
        backgroundColor: '#E55266',
        marginLeft: 0,
        marginTop:20
    },
    listheadText: {
        marginLeft: 12,
        fontWeight:'bold',
        color:'#fff',
    
        
    },
    img: {
        width: Dimensions.get('window').width / 3.5,
        height: 40,
        marginLeft: 0,
        marginRight: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
       // marginBottom: 5,
        resizeMode: 'contain',
        //resizeMode: 'cover',
        borderRadius: 5
    },
    txtColor: {
        color: 'green',
        fontSize: 14
    },
    txtColorStyle: {
        color: 'blue',
        fontSize: 14,
        marginLeft: -50
    }

})