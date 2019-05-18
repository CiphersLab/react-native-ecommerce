import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import GetAPI from '../../API/GetMethod';


export default class TopCategoriesList extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        let th = this;
        this._isMounted = true;
        let getData = []
        GetAPI('/category/get')
            .then(response => response.json())
            .then((json) => {
                getData.push(json.data)
                if (this._isMounted) {
                th.setState({
                    data: getData
                })
                this.props.swip()
            }

            })
            .catch(err => console.log(err));
    }
    componentWillUnmount() {
        this._isMounted = false;
      }
    
    render() {
        return (
            <View>
                <ScrollView style={styles.scrollContainer}  >
                    <View style={styles.container}>
                        {this.state.data.map((data, index) => {
                            return (
                                data.map((alldata, index1) => {
                                    return (
                                        <TouchableOpacity style={styles.box} key={index1} >

                                            <Image source={{ uri: alldata.picture[0].url }} style={styles.img} />
                                            <Text style={styles.text} >{alldata.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            )
                        })}
                    </View>

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
        marginTop: 10
    },
    box: {
        margin: 2,
        width: Dimensions.get('window').width / 2 - 6,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f0'
    },
    img: {
        width: Dimensions.get('window').width / 2 - 6,
        height: 120,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
        resizeMode: 'cover'
    },
    text: {
        fontFamily: 'serif',
        marginTop: 10,

    }


})