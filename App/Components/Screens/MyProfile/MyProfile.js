import React, { Component } from 'react';
import { StyleSheet, ScrollView, AsyncStorage , BackHandler} from 'react-native';
import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Footers from '../Footer/Footer';






export default class MyProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    selectPage = (name) => {
        this.props.onSelectedPage(name);
    }
    componentDidMount() {
        // this.props.onSelectedPage();
        this._isMounted = true;
        BackHandler.addEventListener('hardwareBackPress', this.exit);
        
    }
    exit = () => {
        this.props.onSelectedPage("Home");
        return true;
    }
    componentWillUnmount() {
        //  console.log(Actions); 
        this._isMounted = false;
        BackHandler.removeEventListener('hardwareBackPress', this.exit);
        
      }
    
    myOrder() {
        AsyncStorage.getItem('Token').then((token) => {

            let tokenID = JSON.parse(token)
            if (tokenID) {
                setTimeout(() => {
                    this.props.onSelectedPage('My Order');
                    Actions.MyOrder();
                }, 0);
            }
            else {
                Actions.AuthTabs({ title: 'My Order' });
            }
        }).catch(err => console.log(err))

    }
   
    myProfile() {
        Actions.ProfileUpdate();
    }
    FAQ() {
        Actions.FAQ();
    }
    About() {
        Actions.About();
    }
    logout() {
        AsyncStorage.clear();
        this.props.onSelectedPage('Home');
        setTimeout(() => {
            Actions.Home();
        }, 0)
    }
    render() {

        return (
            <Container>
                <ScrollView>
                    <Content>
                        <List>
                            <ListItem noBorder style={styles.header}>
                                <Text style={styles.headerText}>ORDERS AND RETURNS</Text>
                            </ListItem>
                            <ListItem noBorder onPress={() => this.myOrder()} >
                                <Left>
                                    <Text>My Orders</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem noBorder style={styles.header}>
                                <Text style={styles.headerText}>HELP</Text>
                            </ListItem>
                            <ListItem noBorder>
                                <Left>
                                    <Text>FAQ</Text>
                                </Left>
                                <Right >
                                    <Icon name="arrow-forward" onPress={this.FAQ} />
                                </Right>
                            </ListItem>
                            <ListItem noBorder style={styles.header} >
                                <Text style={styles.headerText} >ACCOUNT</Text>
                            </ListItem>
                            <ListItem noBorder onPress={this.myProfile} >
                                <Left>
                                    <Text >My Profile</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>

                            <ListItem noBorder>
                                <Left>
                                    <Text>About Us</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" onPress={this.About} />
                                </Right>
                            </ListItem>
                            <ListItem noBorder onPress={() => this.logout()}  >
                                <Text>Logout</Text>
                            </ListItem>
                        </List>

                    </Content>

                </ScrollView>
                <Footers onSelectPage={this.selectPage} activeState={this.state.selectedPage} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#DAD7D7',
        marginLeft: 0
    },
    headerText: {
        marginLeft: 15,
        fontFamily: 'Times',
        fontWeight: 'bold',
        fontSize: 11
    }


})