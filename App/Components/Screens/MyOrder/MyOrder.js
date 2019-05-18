import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, AsyncStorage ,ActivityIndicator,BackHandler} from 'react-native';
import { Container, Content, Text, List} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux';
import Footers from '../Footer/Footer';
import GetAPI from '../../API/GetMethod';






export default class MyOrder extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            spin:true
        }
    }
    getItem(data) {
        Actions.SingleOrder({ data: data });

    }
    selectPage = (name) => {
     
        this.props.onSelectedPage(name);
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
    dateset = (dates) => {
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let getMonth = dates.slice(5, 7)
        getMonth = getMonth - 1;
        var gtMon;
        for (var i = 0; i < month.length; i++) {
            if (i == getMonth) {
                gtMon = month[i]
            }

        }
        let year = dates.slice(0, 4);
        let day = dates.slice(8, 10)
        return day + ' ' + gtMon + ' ' + year
    }
    componentWillMount() {
        // console.log('cv',Actions.prevScene);
        let th = this;
        AsyncStorage.getItem('user').then((token) => {
            let userID = JSON.parse(token).data._id;
            GetAPI(`/order/getByUserId?userId=${userID}`).then(res => res.json())
                .then((json) => {
                    th.setState({
                        data: json.data,
                        spin:false
                    })
                })
                .catch((err) => console.log(err))
        })
    }
    componentDidMount() {
        // this.props.onSelectedPage();
        this._isMounted = true;
        BackHandler.addEventListener('hardwareBackPress', this.exit);
        
    }
    exit = () => {
        this.props.onSelectedPage("Home");
        return true;
    }
    componentWillUnmount() {
        //  console.log(Actions); 
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.exit);
        
      }
    render() {
        return (
            <Container>
                <ScrollView>
                    <Content>
                    {
                                this.state.spin?
                                <ActivityIndicator size={120} color="#E55266" style={{marginTop:160}} />
                            :
                        <List >
                            
                            {this.state.data.map((data, index) => {
                                return (

                                    <TouchableOpacity key={index} onPress={() => this.getItem(data)} noBorder style={{ backgroundColor: '#F0F5F7', marginBottom: 10 }} >
                                        <View style={{ width: '100%', flex: 1, flexDirection: 'row', height: 50, marginTop: 10 }} >
                                            <View style={{ flex: 1, flexDirection: 'column' }} >
                                                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10 }}>
                                                    <Icon name="date-range" size={25} color="#418FB6" />
                                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E55266' }}>{this.dateset(data.orderTime.slice(0, 10))}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginRight: 10 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <Icon name="access-time" size={20} color="#418FB6" />
                                                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#E55266' }}>
                                                        {this.Timeset(data.orderTime)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', flex: 1, flexDirection: 'row' }}>
                                            <View style={{ flex: 1, flexDirection: 'column' }} >
                                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: 12, color: '#418FB6', marginLeft: 25 }}>{data.status}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'column', marginRight: 20 }}>
                                                <View style={{ flex: 1, flexDirection: 'row' }}>

                                                    <Text style={{ fontSize: 16, color: '#418FB6' }} >RS: {data.totalPrice}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    </TouchableOpacity>

                                )
                            })}
                        </List>

                        }
                    </Content>
                </ScrollView>
                <Footers onSelectPage={this.selectPage} activeState={this.state.selectedPage} />
            </Container>
        );
    }
}
