import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Home from './App/Components/Screens/Home/Home';
import Navbar from './App/Components/Screens/Navbar/Navbar';
import Sidebar from './App/Components/Screens/Sidebar/Sidebar';
import Items from './App/Components/Screens/Items/Items';
import Signup from './App/Components/Screens/Signup/Signup';
import Login from './App/Components/Screens/Login/Login';
import Footers from './App/Components/Screens/Footer/Footer';
import AuthTabs from './App/Components/Screens/AuthTabs/AuthTabs';
import { Container } from 'native-base';
import ForgotPassword from './App/Components/Screens/ForgotPassword/ForgotPassword';
import ChangePasswordUser from './App/Components/Screens/ChangePasswordUser/ChangePasswordUser';
import MyProfile from './App/Components/Screens/MyProfile/MyProfile';
import MyOrder from './App/Components/Screens/MyOrder/MyOrder';
import SingleOrder from './App/Components/Screens/SingleOrder/SingleOrder';
import ProfileUpdate from './App/Components/Screens/ProfileUpdate/ProfileUpdate';
import FAQ from './App/Components/Screens/FAQ/FAQ';
import About from './App/Components/Screens/About/About';
import Cart from './App/Components/Screens/Cart/Cart';
import CheckOut from './App/Components/Screens/Checkout/Checkout';
import OneItem from './App/Components/Screens/OneItem/OneItem';
import Filter from './App/Components/Screens/Filter/Filter';
import SearchBar from './App/Components/Screens/SearchPage/Search';
import { BackHandler, AsyncStorage } from 'react-native'; 

export default class App extends Component {
  _isMounted = false;
  state = {
    selectedPage: Actions.currentScene?Actions.currentScene.slice(1):"Home",
    bar: 0
  }
  selectPage = (name) => { 
    this.setState({ selectedPage: name });
  }
  exit() {
    console.log("sdfsd")
    BackHandler.exitApp();
    return true;
  }
  componentWillUnmount() {
     this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.exit);
    // BackAndroid.exitApp();
  }
  componentDidMount() {
     this._isMounted = true;
    console.log('sds')
    // AsyncStorage.getItem('card').then((data) => {
    //    let l =data?JSON.parse(data).length:0;
    //    if(l)
    //     this.setState({bar:l});
    // })
    BackHandler.addEventListener('hardwareBackPress', this.exit);
  }

  changeBar = (item) =>{
    // console.log("item",item);
   this.setState({bar: item},() => console.log(this.state.bar));
  }

  render() {
    return (
      <Container>
        <Router navBar={() => <Navbar bar={this.state.bar} title={this.state.selectedPage} />} >

          <Scene key="root" >
            <Scene
              initial
              drawer
              key="SideBar"
              title="menu"
              contentComponent={() => <Sidebar onSelectPage={this.selectPage} />}
              drawerWidth={280}
            >
              <Scene
                key="Home"
                component={Home}
                title="Home"
                onSelectedPage={this.selectPage}
                hideNavBar
              />
              <Scene
                key="Items"
                component={Items}
                title="Items"
                onSelectedPage={this.selectPage}
                hideNavBar
              />
              <Scene
                key="MyProfile"
                component={MyProfile}
                onSelectedPage={this.selectPage}
                title="MyProfile"
                hideNavBar
              />
              <Scene
                key="MyOrder"
                component={MyOrder}
                onSelectedPage={this.selectPage}
                title="MyOrder"
                hideNavBar
              />


            </Scene>
            <Scene
              key="SingleOrder"
              component={SingleOrder}
              title="SingleOrder"
              hideNavBar
            />
             <Scene
              title="SearchBar"
              key="SearchBar"
              component={SearchBar}
              hideNavBar

            /> 
            <Scene
              key="Filter"
              component={Filter}
              title="Filter"
              hideNavBar
            />
            <Scene
              key="ProfileUpdate"
              component={ProfileUpdate}
              title="ProfileUpdate"
              hideNavBar
            />
            <Scene
              key="About"
              component={About}
              title="About"
              hideNavBar
            />
            <Scene
              key="FAQ"
              component={FAQ}
              title="FAQ"
              hideNavBar
            />
            <Scene
              key="Cart"
              component={Cart}
              title="Cart"
              addToCart={(i)=> this.changeBar(i)}
              hideNavBar
            />
            <Scene
              key="CheckOut"
              component={CheckOut}
              title="CheckOut"
              hideNavBar
            />
            <Scene
              key="OneItem"
              component={OneItem}
              title="OneItem"
              addToCart={(i)=> this.changeBar(i)}
              hideNavBar
            />
            <Scene
              key="AuthTabs"
              component={AuthTabs}
              title="AuthTabs"
              hideNavBar
              onSelectedPage={this.selectPage}
            />
            <Scene
              key="Login"
              component={Login}
              title="Login"
              hideNavBar
              onSelectedPage={this.selectPage}

            />
            <Scene
              key="Signup"
              component={Signup}
              title="Signup"
              hideNavBar
            />
            <Scene
              key="ForgotPassword"
              component={ForgotPassword}
              title="ForgotPassword"
              hideNavBar
            />
            <Scene
              key="ChangePasswordUser"
              component={ChangePasswordUser}
              title="ChangePasswordUser"
              hideNavBar
            />
          </Scene>
        </Router>
        {/* 
        <Footers onSelectPage={this.selectPage} activeState={this.state.selectedPage} />
         */}
      </Container>
    );
  }
}


