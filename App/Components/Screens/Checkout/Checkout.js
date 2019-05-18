import React, { Component } from 'react';
import { StyleSheet, View, ScrollView,  AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Right, Text, List, Body, ListItem, Form, Input, Item, Picker, Left, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Head from '../Header/Header';
import GetAPI from '../../API/GetMethod';
import PostAPI from '../../API/PostMethod';





export default class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'CheckOut',
            selected: -1,
            number: "",
            fullname: '',
            disable: true,
            address: '',
            deliveryType: [],
            Total: 0,
            prices: 0,
            data: [],
            userID: '',
            spin:true
        }
    }
    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    CheckOut = () => {
        this.setState({spin:true})
        var d = new Date();
        record = {};
        record.products = this.state.data;
        record.orderTime = d;
        let total = this.state.selected.charges + this.state.prices;
        record.totalPrice = total;
        record.deliveryAddress = this.state.address;
        record.phone = this.state.number;
        record.orderType = this.state.selected._id;
        record.user = this.state.userID;
        record.delivery_charges = this.state.selected.charges;
        PostAPI(record, "/order/create").then(response => response.json())
            .then((json) => {
                this.removeItemValue('card');
                this.setState({spin:false})
                Actions.Home();
            })
            .catch(err => console.log(err))

    }
    address(txt) {
        if (txt.length === 0 || txt.length < 5) {
            this.setState({ disable: true, address: txt })
        }
        else {
            this.setState({ disable: false, address: txt })
        }

    }
    componentWillMount() {
        let th = this;
        AsyncStorage.getItem('Price').then((price) => {
            let pri = JSON.parse(price)
            th.setState({ prices: pri })

        }).catch(err => console.log(err))
        AsyncStorage.getItem('user').then((user) => {
            let userData = JSON.parse(user);
            th.setState({
                userID: userData.data._id,
                fullname: userData.data.name,
                number: userData.data.number
            })
        }).catch(err => console.log(err))
        AsyncStorage.getItem('card').then((cards) => {
            let cardData = JSON.parse(cards);
            th.setState({ data: cardData })
        }).catch(err => console.log(err))
    }
    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }
    componentDidMount() {
        let th = this;

        let getData = []
        GetAPI('/orderType/get')
            .then(response => response.json())
            .then((json) => {
                getData.push(json.data)

                th.setState({
                    deliveryType: json.data,
                    spin:false
                })

            })
            .catch(err => console.log(err));

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
                        <Form>
                            <List>
                                <ListItem noBorder style={styles.listhead} >
                                    <Text style={styles.listheadText} >
                                        ADDITIONAL INFORMATION
                                    </Text>
                                </ListItem>
                            </List>
                            <Item style={styles.input} >
                                <Input placeholder="Full Name" style={styles.txtColor} value={this.state.fullname} placeholderTextColor="#D3D3D3" />
                                <Icon name="user" size={20} color="#E55266" />
                            </Item>
                            <Item style={styles.input} >
                                <Input placeholder="Address" style={styles.txtColor} value={this.state.address} placeholderTextColor="#D3D3D3" onChangeText={(e) => this.address(e)} />
                                <Icon name="location-arrow" size={20} color="#E55266" />
                            </Item>
                            <Item style={styles.input}>
                                <Input placeholder="Contact No." style={styles.txtColor} value={this.state.number} placeholderTextColor="#D3D3D3" />
                                <Icon name="phone" size={20} color="#E55266" />
                            </Item>
                            <Picker
                                note
                                mode="dropdown"
                                selectedValue={this.state.selected}
                                style={{ width: '92%', marginLeft: '4%', marginTop: 10, color: 'green', marginBottom: 10 }}
                                onValueChange={this.onValueChange.bind(this)}
                                itemStyle={{ color: 'green' }}


                            >
                                <Picker.Item label="Select Delivery Type" value={-1} />
                                {this.state.deliveryType.map((item, index) => {
                                    return (
                                        <Picker.Item key={index} label={item.name} value={item} />
                                    )
                                })}

                            </Picker>
                            <List>
                                <ListItem noBorder style={styles.listhead} >
                                    <Text style={styles.listheadText}  >
                                        SUBTOTAL
                                    </Text>
                                </ListItem>
                                <ListItem noBorder >
                                    <Left>
                                        <Text style={styles.txtColor}>
                                            SubTotal
                                    </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.txtColorStyle} >
                                            {`Rs: ${this.state.prices}/=`}
                                        </Text>
                                    </Right>
                                </ListItem>
                                <ListItem noBorder >
                                    <Left>
                                        <Text style={styles.txtColor}>
                                            Delivery Charges
                                    </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.txtColorStyle}>
                                            {this.state.selected !== -1 ? this.state.selected.charges : 0}
                                        </Text>
                                    </Right>
                                </ListItem>
                                <ListItem noBorder >
                                    <Left>
                                        <Text style={styles.txtColor}>
                                            Total
                                    </Text>
                                    </Left>
                                    <Right>
                                        <Text style={styles.txtColorStyle}>
                                            Rs: {this.state.selected !== -1 ? this.state.selected.charges + this.state.prices : this.state.prices}/=
                                    </Text>
                                    </Right>
                                </ListItem>
                            </List>
                            <View>
                                {this.state.selected === -1 ?
                                    <Button success style={styles.btn} onPress={this.CheckOut} disabled={true} ><Text  > Checkout </Text></Button> :
                                    <Button success style={styles.btn} onPress={this.CheckOut} disabled={this.state.disable} ><Text  > Checkout </Text></Button>

                                }
                            </View>
                        </Form>
                    }
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    listhead: {
        // marginTop: 20,
        backgroundColor: '#D4D6D6',
        marginLeft: 0
    },
    listheadText: {
        marginLeft: 12,
    },
    input: {
        width: '92%',
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: 10
    },
    btn: {
        width: '70%',
        marginLeft: '15%',
        marginRight: '15%',
        marginBottom: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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