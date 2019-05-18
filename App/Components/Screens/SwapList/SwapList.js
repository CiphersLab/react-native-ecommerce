import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { Container, Content, Right, Text, List, Body, Header, Title, } from 'native-base';
import { Actions } from 'react-native-router-flux';
import GetAPI from '../../API/GetMethod';

const ItemList = [


]





export default class SwapList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    getSingleProduct(data){
        Actions.OneItem({id:data._id});
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    componentWillMount() {
        let th = this;
        this._isMounted = true;
            GetAPI('/product/get/custom?orderType=descending')
            .then(response => response.json())
            .then((json) => {
                 ItemList.push(json.data)
                 if (this._isMounted) {
                 th.setState({
                     data: ItemList
                 })
                 this.props.swip()
                }
            })
            .catch(err => console.log(err));
    }

    _renderItem(item) {
        return (
            item.map((data, index2) => {
                return (
                    <TouchableOpacity key={index2} style={{ marginLeft: 4, marginRight: 4, marginTop: 30, marginBottom: 20, width: 140, height: 140, backgroundColor: '#FFFAFA' }} onPress={() => this.getSingleProduct(data)} >
                        <Text style={{ fontFamily: 'sans-sarif', fontSize: 13, fontWeight: 'bold', marginLeft: 15 }} >{data.name}</Text>
                        <Text style={{ fontFamily: 'Times', fontSize: 10, marginLeft: 15 }}>{`Up to ${data.discount}% off`}</Text>
                        <Image style={{ width: 100, height: 80, resizeMode: 'cover', marginLeft: 15, marginTop: 10 }} source={{ uri: data.picture[0].url }} />
                    </TouchableOpacity>
                )
            })
        )


    }
    render() {
        return (
            <View>
                <ScrollView>
                    <Content>
                        <FlatList

                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => this._renderItem(item)}
                            data={this.state.data}
                        />

                    </Content>
                </ScrollView>
            </View>
        );
    }
}

