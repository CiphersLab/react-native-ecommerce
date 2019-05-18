import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Footer, FooterTab, Button, Text, Icon, Badge } from 'native-base';
import { Actions } from 'react-native-router-flux';




export default class Footers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabbar: "Home",
    }
  }

  TabIcon = (tab) => {

    if (tab === "Home") {

      setTimeout(() => {
        this.props.onSelectPage(tab);
        Actions.Home();
      }, 0);

    } else if (tab === "Me") {
      AsyncStorage.getItem('Token').then((token) => {
        
        let tokenID = JSON.parse(token)
        if (tokenID) {
      setTimeout(() => {
        this.props.onSelectPage(tab);
        Actions.MyProfile();
      }, 0);
    }
    else{
      Actions.Home();
    }
  })

    } else if (tab === "My Order") {
      AsyncStorage.getItem('Token').then((token) => {
        
        let tokenID = JSON.parse(token)
        if (tokenID) {
          setTimeout(() => {
            this.props.onSelectPage(tab);
            Actions.MyOrder();
          }, 0);
        }
        else {
          Actions.AuthTabs({title:'My Order'});
        }
      }).catch(err => console.log(err))



    }
  }

  render() {
    return (
      <View>
        <Footer>
          <FooterTab style={{ backgroundColor: "#E55266" }} >
            <Button  active={this.state.homeActive} onPress={() => this.TabIcon('Home')} >
              
              <Icon name="home" style={{ color: '#fff' }} />
              <Text style={{ color: '#fff' }} >Home</Text>
            </Button>
            <Button  active={this.state.meActive} onPress={() => this.TabIcon('Me')}  >
           
              <Icon name="man" style={{ color: '#fff' }} />
              <Text style={{ color: '#fff' }} >Me</Text>
            </Button>
            <Button  active={this.state.myOrderActive} onPress={() => this.TabIcon('My Order')} >
              
              <Icon name="basket" style={{ color: '#fff' }} />

              <Text style={{ color: '#fff' }} >My Order</Text>
            </Button>

          </FooterTab>
        </Footer>
      </View>
    );
  }
}
