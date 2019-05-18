import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ChangePasswordUser from '../ChangePasswordUser/ChangePasswordUser';
export default class AuthTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleTab: false,
      activeTabValue: 0,
      forgot: true
    }
  }
  trigerValueChangeState = (value) => {
    this.setState({ forgot: value })
  }

  toogleTabState = (value, num) => {
    this.setState({ toggleTab: value, activeTabValue: num })
  }
  

  render() {
  
    return (
      <Container>
        <Header hasTabs style={{ backgroundColor: '#E55266', }}
          androidStatusBarColor="#E55266" />
        {this.state.toggleTab === true ? (
          <Tabs initialPage={this.state.activeTabValue} page={this.state.activeTabValue}  >
             {this.state.forgot === true ? 
              <Tab tabStyle={{ backgroundColor: '#E55266' }} activeTabStyle={{ backgroundColor: '#E55266' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: "#fff" }} heading="Forgot Password">
                <ForgotPassword trigerValueChange={(value) => this.trigerValueChangeState(value)} triggerState={(value, num) => this.toogleTabState(value, num)} />
              </Tab> 
              : 
              <Tab tabStyle={{ backgroundColor: '#E55266' }} activeTabStyle={{ backgroundColor: '#E55266' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: "#fff" }} heading="Change Password">
                <ChangePasswordUser trigerValueChange={(value) => this.trigerValueChangeState(value)} triggerState={(value, num) => this.toogleTabState(value, num)} />
              </Tab>
            }
          </Tabs>) :
          <Tabs initialPage={this.state.activeTabValue} page={this.state.activeTabValue}  >


            <Tab tabStyle={{ backgroundColor: '#E55266' }} activeTabStyle={{ backgroundColor: '#e86475' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: "#fff" }} heading="Login">
              <Login title={this.props.title} onSelectedPage={this.props.onSelectedPage} triggerState={(value, num) => this.toogleTabState(value, num)} />
            </Tab>

            <Tab tabStyle={{ backgroundColor: '#E55266' }} activeTabStyle={{ backgroundColor: '#e86475' }} textStyle={{ color: '#fff' }} activeTextStyle={{ color: "#fff" }} heading="Register">
              <Signup title={this.props.title} onSelectedPage={this.props.onSelectedPage} triggerState={(value, num) => this.toogleTabState(value, num)} />
            </Tab>
          </Tabs>
        }
      </Container>
    );
  }
}