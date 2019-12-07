/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.logut = this.logut.bind(this);
        this.logut();
    }

    logut = async () => {

        //this.props.navigation.navigate('login');
        try {
            const value = await AsyncStorage.getItem('visited_onces');
            const access_token = JSON.parse(value).access_token

            //alert(access_token)
            let auth = 'Bearer ' + access_token;
            var headers = new Headers();
            headers.append("Authorization", auth);

            //return;
            fetch("http://dev-fs.8d.ie/api/auth/logout", {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson["status"] == "success") {
                        setTimeout(() => {
                            AsyncStorage.setItem('visited_onces', "");
                            this.props.navigation.navigate('login');
                        });

                    }
                    else {
                        setTimeout(() => {
                            AsyncStorage.setItem('visited_onces', "");
                            this.props.navigation.navigate('login');
                        });
                        //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    }
                }).catch((error) => {
                    setTimeout(() => {
                        AsyncStorage.setItem('visited_onces', "");
                        this.props.navigation.navigate('login');
                    });
                    //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });
        } catch (e) {
            setTimeout(() => {
                AsyncStorage.setItem('visited_onces', "");
                this.props.navigation.navigate('login');
            });
        }
    };

    render() {
        return (
            <Text ></Text>
        )
    }

}