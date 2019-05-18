import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';
import { Container, Content, Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostAPI from '../../API/PostMethod';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';






export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      personpassword: '',
      isverified: true,
      isSubmit: true,
      loader: false,
      userInfo: ''

    }
  }
  componentDidMount() {
    //GoogleSignin.hasPlayServices({ autoResolve: true });
    GoogleSignin.configure({
      webClientId: 'google client key', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
    });
    // getCurrentUserInfo = async () => {
    //   try {
    //     const userInfo = await GoogleSignin.signInSilently();
    //     this.setState({ userInfo },()=>{console.log('sd',userInfo)});
    //   } catch (error) {
       
    //     if (error.code === statusCodes.SIGN_IN_REQUIRED) {
    //       // user has not signed in yet
    //     } else {
    //       // some other error
    //     }
    //   }
    // };
  }

  // _signIn = async () => {
  //   console.log('gmail')
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     console.log('deleted');
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   const userInfo = await GoogleSignin.signIn();
  //   console.log(userInfo.accessToken)
  //   userInfo.then(data => {
  //     console.log(data)
  //   })
  //   this.setState({ userInfo });


  // };
  toggle(num) {
    this.props.triggerState(true, num);
  }
  goSignup(val) {
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
            let record = {}
            record.access_token = data.accessToken.toString();
            PostAPI(record, "/user/socail/login").then(response => response.json()).then((json) => {
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
  _Login = () => {

    this.setState({ loader: true })
    if (this.state.email === "") {
      this.setState({ isSubmit: false, loader: false })

    }
    if (this.state.personpassword === "") {
      this.setState({ isSubmit: false, loader: false })
    }
    if (this.state.isverified === false) {
      this.setState({ isSubmit: false, loader: false })
    }
    if ((this.state.email !== "" && this.state.isverified === true) && (this.state.personpassword !== "")) {

      let th = this;
      let record = {}
      this.setState({ isSubmit: true })
      var email = this.state.email;
      record.email = email.toLowerCase();
      record.password = this.state.personpassword;

      PostAPI(record, "/user/login").then(response => response.json()).then((json) => {
   

        if (json.token) {
          ToastAndroid.show('success', ToastAndroid.LONG)
          th.setState({
            email: '',
            personpassword: '',
            isverified: true,
            isSubmit: true,
            loader: false
          })
          AsyncStorage.setItem('Token', JSON.stringify(json.token));
          AsyncStorage.setItem('user', JSON.stringify(json));
    
          if(this.props.title === "My Order"){
            this.props.onSelectedPage("My Order");
              Actions.MyOrder()
          }else{
           Actions.replace('CheckOut')
          }
          
        } else {
          ToastAndroid.show('Not Found', ToastAndroid.LONG)
          th.setState({
            email: '',
            personpassword: '',
            isverified: true,
            isSubmit: true,
            loader: false
          })

        }
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
            <Form>
              <View style={styles.main} >
                <TouchableOpacity style={styles.fbButton} >

                  <Icon.Button name="facebook" size={30} style={styles.buttonIcon} backgroundColor="#3b5998" onPress={this._fbAuth} >

                  </Icon.Button>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gmailButton} >

                  <Icon.Button name="google" size={30} backgroundColor="#dd4b39" style={styles.buttonIcon} onPress={this._signIn}>

                  </Icon.Button>
                </TouchableOpacity>

              </View>

              <Item style={styles.itemOne}  >
                <Icon name="envelope" size={20} color="#E55266" />
                <Input value={this.state.email} placeholderTextColor="#D3D3D3" style={styles.input} placeholder="Email" onChangeText={(text) => this.validate(text)} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.email === "" ?
                  <Text key={this.props} style={styles.error} >Please Enter Email</Text> : this.state.isverified === false ? <Text style={styles.error} >Wrong Email Adrress</Text> : <View></View>
                ] : <View></View>
              }
              <Item style={styles.itemTwo} >
                <Icon name="lock" size={20} color="#E55266" />
                <Input value={this.state.personpassword} placeholderTextColor="#D3D3D3" style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(event) => this.setState({ personpassword: event })} />
              </Item>
              {this.state.isSubmit === false ?
                [this.state.personpassword === "" ?
                  <Text key={this.props} style={styles.error} >Please Enter Password</Text> : <View></View>
                ] : <View></View>
              }
              <View style={styles.forgotStyle}   >
                <Text style={{ color: 'blue' }} onPress={() => this.toggle(0)}  >Forgot Password?</Text>
              </View>
              <TouchableOpacity style={{ marginBottom: 10, marginTop: 35, width: '50%', marginLeft: '25%' }}>
                <Icon.Button style={{ justifyContent: 'center', alignItems: 'center' }} backgroundColor="#E55266" onPress={() => this._Login()} >
                  Login
</Icon.Button>
              </TouchableOpacity>
              <View style={{ marginBottom: 10, paddingTop: '3%' }} >
                <Text style={{ textAlign: 'center' }} >Don't have an account? <Text style={{ color: 'blue' }} onPress={() => this.goSignup(1)}  > Signup</Text></Text>
              </View>

            </Form>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonIcon: {
    marginLeft: '12%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemOne: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '6%',
  },
  itemTwo: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '3%',
  },
  input: {
    fontSize: 14,
    fontFamily: 'sans serif',
    marginLeft: 5,
  },
  forgotStyle: {
    marginTop: '3%',
    width: '60%',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  error: {
    marginLeft: '20%',
    color: 'red',
    fontSize: 8
  }

})
