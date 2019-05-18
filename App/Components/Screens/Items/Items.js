import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity, BackHandler,AsyncStorage,ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Picker, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import GetAPI from '../../API/GetMethod';






export default class Items extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: -1,
            data: [],
            categID: '',
            sort: '',
            type: '',
            spin:true
        }
    }
    getItem(data) {
        Actions.OneItem({ id: data._id });
    }
    onValueChange(value) {
        if (value === "key0") {
            this.setState({
                selected: value,
                type: 'orderType',
                sort: 'descending'
            });
        }
        else if (value === "key1") {
            this.setState({
                selected: value,
                type: 'priceType',
                sort: 'ascending'
            });
        }
        else if (value === "key2") {
            this.setState({
                selected: value,
                type: 'priceType ',
                sort: 'descending'
            });
        }
        else {
            this.setState({
                selected: value,
                sort: '',
                type: ''
            });
        }
        if (value !== -1) {
            GetAPI(`/product/get/custom?${this.state.type}=${this.state.sort}&category=${this.state.categID}`).then(res => res.json())
            .then(json =>{
                console.log(json)
                this.setState({
                    data: json.data,
                })
            })
            .catch(err => console.log(err))
        }
    }
    filter = () => {
        let CatID = this.state.categID
        Actions.Filter({ ID: CatID });
    }
    componentWillMount() {
        AsyncStorage.getItem('subCategory')
            .then((data) => {
                let SUBID = JSON.parse(data);
                GetAPI(`/product/getBySubCategoryId?subCategoryID=${SUBID}`).then(res => res.json())
                    .then(json => {
                        this.setState({
                            data: json.data,
                            categID: json.data[0].category._id,
                            spin:false
                        })
                    })
            })
            .catch(err => console.log(err))
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
            <View>
                <ScrollView style={styles.scrollContainer} >
                {
                                this.state.spin?
                                <ActivityIndicator size={120} color="#E55266" style={{marginTop:160}} />
                            :
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff' }} >
                            <Button transparent style={{ width: Dimensions.get('window').width / 2.2, justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginTop: 5 }} onPress={this.filter} >
                                <Icon name="filter" size={25} color="#E55266" />
                                <Text style={{ textAlign: 'center', fontFamily: 'Times', fontWeight: 'bold', fontSize: 18, marginLeft: 5 }} >Filter</Text>
                            </Button>
                            <Picker
                                note
                                mode="dropdown"
                                selectedValue={this.state.selected}
                                style={{ width: Dimensions.get('window').width / 2.2, marginLeft: "3.5%", marginRight: '2%', marginTop: 5, color: 'gray', marginBottom: 10, fontFamily: 'Times', fontWeight: 'bold', fontSize: 18, }}
                                onValueChange={this.onValueChange.bind(this)}
                                itemStyle={{ backgroundColor: 'red' }}
                            >
                                <Picker.Item label="Select" value={-1} />
                                <Picker.Item label="New In" value="key0" />
                                <Picker.Item label="Price Hight To Low" value="key1" />
                                <Picker.Item label="Price Low To Hight" value="key2" />
                            </Picker>
                        </View>

                        <View style={styles.container}>

                            {
                                this.state.data.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} style={styles.box} onPress={() => this.getItem(item)} >
                                            <Text style={{ fontFamily: 'roboto', marginTop: 15, marginLeft: 5, marginBottom: 5, color: 'black', fontWeight: 'bold', fontSize: 10 }} >{item.company.name}</Text>
                                            <View style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }} >
                                                <Image source={{ uri: item.picture[0].url }} style={styles.img} />
                                            </View>

                                            <Text style={styles.text} >{item.name}</Text>
                                            <Text style={{ fontFamily: 'roboto', marginLeft: 10, fontSize: 10, textDecorationLine: 'line-through', marginTop: 5 }} >RS = {item.price}/</Text>
                                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                                <Text style={{ marginLeft: 10, marginTop: 10, fontSize: 11, fontFamily: 'roboto', color: '#E55266' }} >RS: {((item.price) - (item.price * ((Number(item.discount) / 100))))}/=</Text>
                                                <Right style={{ marginRight: 20 }} >
                                                    <Text style={{ fontFamily: 'roboto', fontSize: 11 }} >{item.discount}%</Text>
                                                </Right>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }


                        </View>
                    </View>
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        //  flex:1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 2,
        marginTop: 0
    },
    box: {
        margin: 2,
        width: Dimensions.get('window').width / 2 - 6,
        height: 190,

        backgroundColor: '#f5f5f0'
    },
    img: {
        // width: Dimensions.get('window').width / 2 - 6,
        width: 80,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,

        height: 80,
        resizeMode: 'cover',
        marginLeft: 5,
        //  marginTop: 10 
    },
    text: {
        textAlign: 'center',
        fontFamily: 'roboto',
        marginTop: 5,
        fontSize: 11,
        fontWeight: 'bold',
        color: '#E55266'

    }


})