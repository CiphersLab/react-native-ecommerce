import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Content, Form, Item, Input, Left } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostAPI from '../../API/PostMethod';
import { LoginManager, AccessToken } from 'react-native-fbsdk';






export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      personpassword: '',
      email: '',
      phone: '+92',
      isSubmit: true,
      isverified: true
    }

  }
  goLogin(val) {
    this.props.triggerState(false, val);
  }

  _fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(function (result) {

      if (result.isCancelled) {
        console.log('Login was cancelled');

      } else {

        console.log('Login was a success ' + result.grantedPermissions.toString());

        AccessToken.getCurrentAccessToken().then(
          (data) => {

            console.log(data.accessToken.toString())
            let record = {}
            record.access_token = data.accessToken.toString();
            PostAPI(record, "/user/socail/login").then(response => response.json()).then((json) => {
              console.log('json', json)
              ToastAndroid.show('success', ToastAndroid.LONG)

            }).catch((err) => {
              ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
            })

          }
        )




      }
    }, function (error) {
      console.log("An error occured: " + error);
    })

  }
  validate = (text) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (text.length <= 0) {
      this.setState({ email: '' })
    } else if (reg.test(text) === false) {
      this.setState({ isverified: false, email: text })
      return false;
    }
    else {
      this.setState({ email: text, isverified: true })

    }
  }
  _submit() {

    if (this.state.name === "") {
      this.setState({ isSubmit: false });
    }

    if (this.state.email === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.phone === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.personpassword === "") {
      this.setState({ isSubmit: false });
    }
    if (this.state.name.length < 4) {
      this.setState({ isSubmit: false });
    }
    if (this.state.phone.length < 13) {
      this.setState({ isSubmit: false });
    }
    if (this.state.personpassword < 8) {
      this.setState({ isSubmit: false });
    }
    if (this.state.isverified === false) {
      this.setState({ isSubmit: false });
    }


    if ((this.state.name !== "" && this.state.name.length > 3) && (this.state.email !== "" && this.state.isverified === true) && (this.state.phone !== "" && this.state.phone.length > 12) && (this.state.personpassword !== "" && this.state.personpassword.length > 7)) {
      let record = {}

      this.setState({
        isSubmit: true
      })
      let th = this;
      record.name = this.state.name;

      let email = this.state.email;
      record.email = email.toLowerCase()
      record.password = this.state.personpassword;
      record.number = this.state.phone

      PostAPI(record, "/user/register").then(response => response.json()).then((json) => {
        console.log('json', json)
        th.setState({ name: '', email: '', personpassword: '', phone: '+92', isverified: true, isSubmit: true })
        ToastAndroid.show('success', ToastAndroid.LONG)


      }).catch((err) => {
        ToastAndroid.show(`failed${err}`, ToastAndroid.LONG)
      })
      

    }
  }



  render() {
    return (
      <Container>
        <ScrollView>
          <Content>
            <Form  >
              <View style={styles.main} >
                <TouchableOpacity style={styles.fbButton} >

                  <Icon.Button name="facebook" size={30} style={styles.buttonIcon} backgroundColor="#3b5998" onPress={this._fbAuth} >

                  </Icon.Button>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gmailButton} >

                  <Icon.Button name="google" size={30} backgroundColor="#dd4b39" style={styles.buttonIcon} >

                  </Icon.Button>
                </TouchableOpacity>

              </View>
              <View>
                <Item style={styles.itemOne}  >
                  <Icon name="user" size={28} color="#E55266" />
                  <Input placeholderTextColor="#D3D3D3" value={this.state.name} style={styles.input} placeholder="Full Name" onChangeText={(event) => {

                    this.setState({ name: event })

                  }} />
                </Item>

                {this.state.isSubmit === false ?

                  [this.state.name === "" ?
                    <Text key={this.props} style={styles.error} >Please Enter Name</Text> : this.state.name.length < 4 ? <Text style={styles.error} >Name atLeast 4 Character Long</Text> : <View></View>
                  ] : <View></View>

                }

                <Item style={styles.itemTwo}  >
                  <Icon name="envelope" size={20} color="#E55266" />
                  <Input placeholderTextColor="#D3D3D3" style={styles.input} value={this.state.email} placeholder="Email" onChangeText={(text) => this.validate(text)} />
                </Item>
                {this.state.isSubmit === false ?
                  [this.state.email === "" ?
                    <Text key={this.props} style={styles.error} >Please Enter Email</Text> : this.state.isverified === false ? <Text style={styles.error} >Invalid Email Adrress</Text> : <View></View>
                  ] : <View></View>
                }

                <Item style={styles.itemTwo} >
                  <Icon name="phone" size={24} color="#E55266" />
                  <Input placeholderTextColor="#D3D3D3" style={styles.input} value={this.state.phone} placeholder="+92336655..." keyboardType='phone-pad' maxLength={13} onChangeText={(event) => this.setState({ phone: event })} />
                </Item>
                {this.state.isSubmit === false ?
                  [this.state.phone === "" ?
                    <Text key={this.props} style={styles.error} >Please Enter Number</Text>
                    : this.state.phone.length < 13 ? <Text key={this.props} style={styles.error} >Invalid Mobile Number</Text>
                      : <View></View>
                  ] : <View></View>
                }


                <Item style={styles.itemTwo} >
                  <Icon name="lock" size={25} color="#E55266" />
                  <Input placeholderTextColor="#D3D3D3" style={styles.input} value={this.state.personpassword} placeholder="Password" secureTextEntry={true} onChangeText={(event) => this.setState({ personpassword: event })} />
                </Item>
                {this.state.isSubmit === false ?
                  [this.state.personpassword === "" ?
                    <Text key={this.props} style={styles.error} >Please Enter Password</Text> : this.state.personpassword.length < 8 ? <Text style={styles.error} >Password atLeast 8 Character Long</Text> : <View></View>
                  ] : <View></View>
                }
              </View>
              <TouchableOpacity style={{ marginBottom: 15, marginTop: 35, width: '50%', marginLeft: '25%' }}>
                <Icon.Button style={{ justifyContent: 'center', alignItems: 'center' }} name="user-plus" backgroundColor="#E55266" onPress={this._submit.bind(this)} >
                  Signup
</Icon.Button>
              </TouchableOpacity>
              <Text style={styles.accountStyle} >Already account? <Text style={{ color: 'blue' }} onPress={() => this.goLogin(0)} > Login</Text></Text>

            </Form>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  itemOne: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '4%'
  },
  itemTwo: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '3%',
  },

  main: {
    flex: 1,
    flexDirection: 'row',
  },
  fbButton: {
    width: '20%',
    justifyContent: 'center',
    marginLeft: '30%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
    height: 40,
    marginBottom: '10%'
  },
  gmailButton: {
    width: '20%',
    justifyContent: 'center',
    marginRight: '10%',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '8%',
    height: 40,
    marginBottom: '10%',
  },
  buttonIcon: {
    marginLeft: '12%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    fontSize: 14,
    fontFamily: 'sans serif',
    marginLeft: 5,

  },
  accountStyle: {
    textAlign: 'center',
    paddingTop: '0%',
    marginBottom: '14%'
  },
  error: {
    marginLeft: '20%',
    color: 'red',
    fontSize: 8
  }

})