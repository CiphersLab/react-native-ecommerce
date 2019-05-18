import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container,Content, Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';







export default class ChangePasswordUser extends Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }
  forgotBtn(value){
    this.props.trigerValueChange(value);
    this.props.triggerState(false,0);
   
  }
  render() {
    return (
      <Container>
        <ScrollView>
        <Content>
          <Form>  
          <Item style={styles.itemOne} >
                <Icon name="lock" size={25} color="#E55266" />
                <Input placeholderTextColor="#D3D3D3" style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(event) => this.setState({ personpassword: event })} />
              </Item>
              <Item style={styles.itemTwo} >
                <Icon name="lock" color="#E55266" size={25} />
                <Input placeholderTextColor="#D3D3D3" style={styles.input} placeholder="Conform Password" secureTextEntry={true} onChangeText={(event) => this.setState({ conformpass: event })} />
              </Item >
              <TouchableOpacity style={{ marginBottom: 20, marginTop: 35, width: '50%', marginLeft: '25%' }}>
                <Icon.Button style={{ justifyContent: 'center', alignItems: 'center'}}  backgroundColor="#E55266" onPress={() => this.forgotBtn(true)}  >
                Change Password
</Icon.Button>
              </TouchableOpacity>
              
          </Form>
        </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
  buttonIcon: {
    marginLeft: '12%',
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemOne: {
    width: '60%',
    marginLeft: '20%',
    marginTop: '20%', 
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
  accountStyle: {
    textAlign: 'center',
    paddingTop: '0%',
    marginBottom: '3%'
  },

})