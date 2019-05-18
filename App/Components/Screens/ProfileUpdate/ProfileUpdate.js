import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, TouchableOpacity, AsyncStorage,ActivityIndicator } from 'react-native';
import { Container, Button, Form, Input, Item, Text, Content, Label } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Head from '../Header/Header';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';


const options = {
    title: "my pic app",
    takePhotoButtonTitle: "Take photo with your camera",
    chooseFromLibraryButtonTitle: "Choose photo from Library "
}




export default class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Profile Update",
            avatarSource: null,
            data: '',
            dataKey: {},
            id: '',
            username: "",
            email: '',
            mobile: '',
            spin:true
        }
    }
    takePicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.data);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('User FIles', response)
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    data: response.data,
                    dataKey: { 'key': 'i' }
                });
            }
        });
    }

    componentWillMount(){
        let th = this;
        AsyncStorage.getItem('user').then((data) => {
            let userData = JSON.parse(data).data;
            this.setState({
             email:userData.email,
             username:userData.name,
             mobile:userData.number,
             id:userData._id,
             spin:false
            })
        })
        .catch(err => console.log(err))
    }
    takePicture() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.data);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log('User FIles', response)
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                    data: response.data,
                    dataKey: { 'key': 'i' }
                });
            }
        });
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
                        <View style={styles.imageView} >
                            <Image source={this.state.avatarSource} style={styles.imageStyle} resizeMode='cover' />

                        </View>
                        <Form style={{ marginBottom: 40 }} >
                            <View style={styles.buttonView} >

                                <Button style={styles.buttonIcon} backgroundColor="#E55266" onPress={this.takePicture.bind(this)} >
                                    <Icon name="camera" color="#fff" size={20} style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 30 }} />
                                    <Text style={{ fontFamily: 'Arial', fontSize: 12, fontWeight: 'bold' }} >Edit</Text>
                                </Button>
                            </View>
                            <Item style={styles.itemOne} >
                                <IconTwo name="user" size={28} color="#E55266" />
                                <Input value={this.state.username} placeholder="Full Name" />
                            </Item>
                            <Item  style={styles.itemTwo}>
                              
                                <IconTwo name="envelope" size={20} color="#E55266" />
                                <Input value={this.state.email} disabled placeholder="Email" />
                            </Item>
                            <Item  style={styles.itemTwo}>
                                
                                <IconTwo name="phone" size={24} color="#E55266" />
                                <Input value={this.state.mobile} placeholder="Mobile No" />
                            </Item>
                            <TouchableOpacity style={{marginTop:40, marginLeft:'30%'}} >
                                <Button style={styles.buttonIcon} backgroundColor="#E55266" >
                                    <Text style={{ fontFamily: 'Arial', fontSize: 12, fontWeight: 'bold' }} >Update Record</Text>
                                </Button>
                            </TouchableOpacity>
                        </Form>
                        </View>
                    }
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    imageView: {
        paddingTop: '8%',
        paddingBottom: '0%',
        borderRadius: 100,

    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 1,

    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonView: {
        width: '46%',
        justifyContent: 'center',
        flex: 1,
        height: 80,
        marginLeft: '35%',
        alignContent: 'center',
    },
    itemOne: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '1%'
    },
    itemTwo: {
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%'
    },
});
