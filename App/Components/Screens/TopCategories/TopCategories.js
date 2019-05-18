import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';







export default class TopCategories extends Component {
  render() {
    return (
      <View>
        <ScrollView>
        <Text style={styles.textStyle} >SHOP BY CATEGORY</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textStyle:{
        marginTop:15,
        marginLeft:15,
        fontFamily: 'serif',
    }

})