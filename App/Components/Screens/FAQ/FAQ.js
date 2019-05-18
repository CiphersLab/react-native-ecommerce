import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Form, Input, Item, Text, Content } from 'native-base';
import VectorIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Head from '../Header/Header';





export default class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'FAQ'
     
        }
    }
    close() {
        Actions.pop();
    }
    render() {

        return (
            <Container>
                <Head title={this.state.name} />
                <ScrollView>
                    <Content>
                        <Text style={styles.ques} >
                        Why is it important for business owners to create an ecommerce site? 
                        </Text>
                        <Text style={styles.ans} >
                        Today, people have very less time to purchase items, by going to physical stores. They prefer to browse their mobile devices or PC and shop online. Having an ecommerce site for your business will help you to capture this market base and keep your customers informed about all your latest products and services.
                        </Text>
                        <Text style={styles.ques}>
                        How should I promote my ecommerce site?
                        </Text>
                        <Text style={styles.ans}>
                        There are various ways to do this and the first thing to do is to promote the site to all the customers. This will help to increase your customer base. Your website address should be present on every advertisement that your company invests in. Register with the search engines and optimize your website as this will affect the traffic of your site.
                        </Text>
                        <Text style={styles.ques}>
                        What are the important things that can turn browsers into buyers?
                        </Text>
                        <Text style={styles.ans}>
                        Create your site so that it is much more oriented towards sales rather than marketing. Let your visitors see your products immediately instead of hiding them behind lots of marketing copy. Make a page that reads the terms and conditions as it will offer a professional look. Provide your contact details and explain your return policies, security, encryption methods and payment options.
                        </Text>
                        <Text style={styles.ques}>
                        What are the security risks that are involved with ecommerce sites?
                        </Text>
                        <Text style={styles.ans}>
                        Ecommerce website owners should always keep in mind the three dimensions of security - confidentiality, integrity and availability. Business owners should develop a good strategy that can help to make the site and transactions secured. To avoid any hackers gain access to important confidential data, include encryption methods for any data transactions.
                        </Text>
                        <Text style={styles.ques}>
                        Is there any limit on the size of my product or customer database?
                        </Text>
                        <Text style={styles.ans}>
                        No, as such there are no limits on the size. The biggest benefit of having an online store is that you can add unlimited products and catalogues and at the same time you can grow your customer base as you require.
                        </Text>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
ques:{
    fontFamily:'serif',
    marginTop:10,
    marginBottom:5,
    marginLeft:8,
    marginRight:8,
    fontSize:14,
    fontWeight:'bold'
},
ans:{
    marginLeft:12,
    marginRight:12,
    marginBottom:5,
    marginTop:5,
    fontSize:12,
    fontFamily:'Times'
}

});
