import React, { Component } from 'react';
import { StyleSheet,  View, TouchableOpacity, AsyncStorage } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Badge, Text } from 'native-base';
import VectorIcon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';





export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
     bar:0
    }
  }
  search = () => {
    Actions.SearchBar();
  }
 
  cart = () =>{
    Actions.Cart();
  }
  componentDidMount(){
    // console.log('sds')
    AsyncStorage.getItem('card').then((data) => {
       let l =JSON.parse(data).length;
       this.setState({bar:l})
    })
  }
  render() {
    return (
      <View style={styles.container} >
        <Header style={{ backgroundColor: '#E55266', }}
          androidStatusBarColor="#E55266">
          <Left style={{ flex: 0.8 }} >

            <TouchableOpacity
              onPress={() => {
                Actions.drawerToggle();
              }}


              hitSlop={{ left: 15, top: 15, right: 15, bottom: 15 }}

            ><Icon name='menu' style={{ color: 'white' }} />
            </TouchableOpacity>
          </Left>
  
          <Body style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Title style={{fontFamily:'roboto', fontSize:12}}  >{this.props.title.toUpperCase()}</Title>
    
          </Body>
          <Right >
            <Button transparent onPress={this.search} >
              <VectorIcon name='search1' size={20} color="#fff" />
            </Button>
            
            <Button  transparent onPress={this.cart} >
            
              <Icon name='cart' style={{fontSize:30}}   color="#fff" />
              <Badge style={{backgroundColor:'#ffa31a', marginLeft:-4, marginTop:-4}} ><Text>{this.props.bar?this.props.bar:this.state.bar}</Text></Badge>
            </Button>
            
          </Right>

        </Header>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  itemOne:{
    width:200,
    marginTop:-18,
    marginRight:20,
    borderColor: '#E55266'
    

  },
  input:{
    color:'#fff',
    marginTop:20,
    
  }

});
