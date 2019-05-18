import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Container,Content, Form, Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';






export default class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state ={

    }
  }
  toggle(num){
    this.props.triggerState(false,num); 
 }
 forgotBtn(value){
   this.props.trigerValueChange(value)
 }
  render() {
    return (
      <Container>
        <ScrollView>
        <Content>
          <Form>  
          <Item style={styles.itemOne} >
                <Icon name="envelope" size={20} color="#E55266" />
                <Input placeholderTextColor="#D3D3D3" style={styles.input} placeholder="Email"  onChangeText={(event) => this.setState({ email: event })} />
              </Item>
              
              <TouchableOpacity style={{ marginBottom: 20, marginTop: 35, width: '50%', marginLeft: '25%' }}  >
                <Icon.Button style={{ justifyContent: 'center', alignItems: 'center'}}  backgroundColor="#E55266" onPress={() => this.forgotBtn(false)}  >
                NEXT
</Icon.Button>
              </TouchableOpacity>
              <Text style={styles.accountStyle} >Already account? <Text style={{ color: 'blue' }} onPress={() => this.toggle(0)} > Login</Text></Text>
            
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