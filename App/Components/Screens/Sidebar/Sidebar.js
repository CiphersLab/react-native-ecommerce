import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView , AsyncStorage} from 'react-native';
import { Container, Left, Body, Right, Text, List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import IconTwo from 'react-native-vector-icons/FontAwesome';
import IconThree from 'react-native-vector-icons/Ionicons';
import IconFourth from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import GetAPI from '../../API/GetMethod';


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: false,
      category: [],
      check: false


    }
  }
  onPress = () => {
    let list = this.state.list;
    this.setState({
      list: !list
    })

  }
  items = (itemName, id) => {
    AsyncStorage.setItem('subCategory', JSON.stringify(id));
    this.props.onSelectPage(itemName);
    setTimeout(() => {
      Actions.Items({text :"text"});
      Actions.drawerClose();
    }, 0)
    
  }
  home = () => {
    this.props.onSelectPage("Home");
    Actions.drawerClose();
    Actions.Home();
  }

  componentWillMount() {
    GetAPI('/category/get/metadata').then(res => res.json())
      .then(json => {
        this.setState({
          category: json.data.map(el => {
            el.active = false;
            return el;
          })
        })

      })
      .catch(err => console.log(err))
  }
  reverse = (item, index) => {
    var { category } = this.state;
    category[index].active = !category[index].active;
    this.setState({ category: category })
  }

  render() {
    return (
      <Container>
        <ScrollView>
          <View>
            <View style={styles.main} >
              <TouchableOpacity style={styles.touchButton} >
                <Icon name="user" size={80} color="#4784C2" />
              </TouchableOpacity>
              <Text style={styles.welcome} >Welcome</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.list} onPress={this.home} >
                <Icon name="home" size={25} color="#E55266" />
                <Text style={styles.homeText} >Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.list} onPress={this.onPress}  >
                <IconThree name="logo-buffer" size={25} color="#E55266" />
                <Text style={styles.homeText} >Categories</Text>
                {this.state.list ?
                  <IconTwo name="caret-up" size={15} color="black" /> :
                  <IconTwo name="caret-down" size={15} color="black" />}
              </TouchableOpacity>
              {this.state.list ?
                <View style={styles.listing}>
                  <List>
                    {this.state.category.map((item, index) => {
                      return (
                        <View key={index} >
                          <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 20 }} onPress={() => this.reverse(item, index)} >
                            {
                              item.subcategory.data.length ?
                                <Text style={styles.listText}  >{item.name}</Text> :
                                <Text style={styles.listText} onPress={() => this.items(item.name, item._id)} >{item.name}</Text>
                            }
                            {item.subcategory.data.length ?
                              <Right style={{ marginRight: 20 }} >
                                <IconFourth style={{ marginTop: 11, }} size={16} name="rightcircleo" />
                              </Right> : <Right></Right>
                            }
                          </TouchableOpacity>
                          {
                            this.state.category[index].active ?
                              item.subcategory.data.map((subItem, index1) => {
                                return (

                                  <ListItem noBorder key={index1} >
                                    <Left>
                                      <IconFourth name="rightcircleo" size={15} color="#E55266" style={{ marginTop: -10 }} />
                                    </Left>
                                    <Body>
                                      <Text style={styles.subCategory} onPress={() => this.items(subItem.name,subItem._id)}  >{subItem.name}</Text>
                                    </Body>
                                  </ListItem >
                                )
                              }) : <View></View>
                          }
                        </View >
                      )
                    })}
                  </List>
                </View> : <View></View>}
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  touchButton: {
    borderWidth: 2,
    borderColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#E8E8E6',
    borderRadius: 100,

  },
  main: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  welcome: {
    color: '#2E2E2E',
    marginTop: 12,
    fontFamily: 'serif',
    fontWeight: '500'
  },
  list: {
    marginLeft: 26,
    marginTop: 20,
    paddingLeft: 8,
    width: 200,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  homeText: {
    paddingLeft: 14,
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    paddingRight: 10
  },
  listing: {
    marginLeft: 50,
    marginTop: 10
  },
  listText: {
    fontSize: 13,
    fontFamily: 'serif',
    color: '#7E7E7E',
    fontWeight: '500',
    marginTop: 10,
    marginLeft: 8
  },
  subCategory: {
    fontSize: 10,
    marginTop: -10,
    padding: -1,
    marginLeft: -60
  }

});
