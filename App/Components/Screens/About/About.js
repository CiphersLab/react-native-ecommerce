import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Form, Input, Item, Text, Content } from 'native-base';
import VectorIcon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import Head from '../Header/Header';





export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "About Us"
        }
    }

    render() {

        return (
            <Container>
                <Head title={this.state.name} />
                <ScrollView>
                    <Content>
                        <Text style={styles.heading} >
                            Long story short
                        </Text>
                        <Text style={styles.about} >
                            Ecommerce platforms are one of the most used types of CMSes and there are more and more apps popping out (more than 120!). That's why comparison websites started to include ecommerce platforms to their inventory. However, I've noticed some of these sites are quite biased and falsely rank particular platforms higher than others because of financial incentives, so I decided to start my own blog and comparison chart for these types of web apps.
                        </Text>
                        <Text style={styles.heading} >
                            What this site is all about
                        </Text>
                        <Text style={styles.about}>
                            Ecommerce-Platforms.com is an unbiased review site that shows the good, great, bad, and ugly of online store building software. We strive to provide you with easy to read (and sometimes fun) objective reviews that will help you choose which ecommerce platform is right for you. We do get affiliate commissions from some of the solutions we're reviewing and comparing but this doesn't influence our writings in any way!
                        </Text>
                        <Text style={styles.heading} >
                            Who are we
                        </Text>
                        <Text style={styles.about}>
                            This site is run and owned by the same team behind Inspired Magazine, one of the oldest blogs for web designers & developers
                        </Text>
                    </Content>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    about: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 12,
        fontFamily: 'sarif'
    },
    heading: {
        marginLeft: 20,
        marginRight: 20,
        fontFamily: 'monospace',
        fontSize: 17,
        fontWeight:'400',
        marginTop: 12,
        color:'#E55266'
    }
});
