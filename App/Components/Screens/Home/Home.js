import React, { Component } from 'react';
import { ScrollView, BackHandler, ActivityIndicator } from 'react-native';
import { Container, View } from 'native-base';
import Slider from '../Slider/Slider';
import TopCategories from '../TopCategories/TopCategories';
import TopCategoriesList from '../TopCategoriesList/TopCategoriesList';
import SwapList from '../SwapList/SwapList';
import SpecialOffer from '../SpecialOffer/SpecialOffer';
import Footers from '../Footer/Footer';





export default class Home extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: "Home",
      categoryOn: true,
      swapOn: true

    }
  }
  selectPage = (name) => {
    this.props.onSelectedPage(name);
  }
  handleBackButton() {
    return true;
  }
  exit() {
    console.log("sdfsd")
    BackHandler.exitApp();
    return true;
  }
  componentWillUnmount() {
    this._isMounted = false;

  }
  componentDidMount() {
    this._isMounted = true;
    // BackHandler.addEventListener('hardwareBackPress', this.exit);
  }
  swapON=()=>{
    this.setState({swapOn:false})
  }
  categoryOn=()=>{
    this.setState({categoryOn:false},()=>console.log(this.state))
  }
  render() {

    return (
      <Container>

        <ScrollView>
          
            
              
              
              <ActivityIndicator size={120} color="#E55266" style={this.state.swapOn && this.state.categoryOn ? { marginTop: 160 }:{display:'none'}} />
              <View style={this.state.swapOn && this.state.categoryOn ? {  height:0 }:{ height: 'auto'}}>
                <Slider />
                <SwapList swip={this.swapON} />
                <SpecialOffer />
                <TopCategories />
                <TopCategoriesList swip={this.categoryOn} />
              </View>
        
        </ScrollView>
        <Footers onSelectPage={this.selectPage} activeState={this.state.selectedPage} />
      </Container>
    );
  }
}
