/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Platform, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Icon, Col, CheckBox } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { reduxForm } from 'redux-form'
import { Form, Field } from 'react-native-validate-form';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import InputField from "../component/InputField";

const required = value => (value ? undefined : 'This is a required field.');
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;


export default class SaveEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
            hasError: false,
            errorText: '',
            social_id: '',
            registertype: ''
        };

        // this.login = this.login.bind(this);
    }

    componentWillMount() {
        this.setState({ name: this.props.user.name });
        this.setState({ social_id: this.props.user.social_id });
        this.setState({ registertype: this.props.user.registertype });
    }


    emailvalidate = (text) => {
        console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text })

            let submitResults = this.myForm.validate();

            let errors = [];

            submitResults.forEach(item => {
                errors.push({ field: item.fieldName, error: item.error });
            });
            this.setState({ errors: errors });
            return false;
        }
        else {
            this.setState({ email: text })
            this.setState({ errors: [] });
        }
    }

    submitForm() {
        let submitResults = this.myForm.validate();

        let errors = [];

        submitResults.forEach(item => {
            errors.push({ field: item.fieldName, error: item.error });
        });
        this.setState({ errors: errors });
    }

    submitFailed() {
        console.log("Submit Faield!");
    }

    submitSuccess() {

        var data = new FormData()
        data.append('email', this.state.email);
        data.append('name', this.state.name);
        data.append('social_id', this.state.social_id);
        data.append('registertype', this.state.registertype);

        var headers = new Headers();
        headers.append('Accept', 'application/json');


        //alert(JSON.stringify(data))
        //return
        //call social register here      
        fetch("http://dev-fs.8d.ie/api/auth/register-social-email", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(responseJson["status"])
                if (responseJson["status"] == "success") {
                    //call social login here
                    this.sociallogin()
                }
                else {
                    this.sociallogin()
                    // if (responseJson["errors"]["email"][0] != "") {
                    //     Alert.alert(
                    //         'Verify email',
                    //         responseJson["errors"]["email"][0],
                    //         [
                    //             {
                    //                 text: 'Cancel',
                    //                 style: 'cancel',
                    //             },
                    //             { text: 'Go To Loign', onPress: () => this.gotologin() },
                    //         ],
                    //         { cancelable: false },
                    //     )
                    // }
                }
            }).catch((error) => {
                //alert(error);
                //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                //alert(error);
            });
    }

    storeData = async (data, access_token) => {
        let obj = {
            id: data.id,
            email: data.email,
            name: data.name,
            access_token: access_token
        }
        try {
            await AsyncStorage.setItem('visited_onces', JSON.stringify(obj));
        } catch (e) {
        }
    }

    sociallogin = async () => {

        var data = new FormData()
        //data.append('email', 'info@orientalpantry.ie');
        data.append('email', this.state.email);
        data.append('social_id', this.state.social_id);
        data.append('registertype', this.state.registertype);

        var headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch("http://dev-fs.8d.ie/api/auth/social-login ", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {

                if (responseJson["status"] == "success") {
                    this.storeData(responseJson["customer"], responseJson["access_token"]);
                    setTimeout(() => {
                        this.props.navigation.navigate('hotdeals', { Json_value: responseJson["customer"] });
                    }, 1000);
                }
                else {
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                }
            }).catch((error) => {
                //alert(error);
                this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                //alert(error);
            });
    }

    gotologin() {
        this.props.navigation.navigate('login');
    };

    render() {
        return (

            <ImageBackground source={require('../images/b1.jpg')} style={{ width: '100%', height: '100%', position: "absolute", top: 0 }}>
                <Container style={{ backgroundColor: '#ff9500b3', width: '100%', }}>

                    <View style={{ flex: 1, alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>

                        <Form ref={(ref) => this.myForm = ref}
                            validate={true}
                            submit={this.submitSuccess.bind(this)}
                            failed={this.submitFailed.bind(this)}
                            errors={this.state.errors}>

                            <View style={{ paddingTop: 20 }}>
                                <Image
                                    source={require('../images/logo.png')}
                                />
                            </View>
                            <Field
                                component={InputField}
                                name="Username"
                                value={this.state.name}
                                onChangeText={(text) => this.setState({ name: text })}
                                customStyle={styles.text_css}
                                placeholder="Username"
                                placeholderTextColor="white"
                            />
                            <Field
                                required
                                component={InputField}
                                validations={[required, email]}
                                name="email"
                                value={this.state.email}
                                onChangeText={text => this.emailvalidate(text)}
                                customStyle={styles.text_css}
                                placeholder="Email ID"
                                placeholderTextColor="white"
                                errors={this.state.errors}
                            />


                            <View style={{ width: '100%' }}>
                                <Button onPress={() => this.submitForm()} style={{ backgroundColor: "white", borderRadius: 9, marginTop: 20 }}>
                                    <Text style={{ color: '#808080', textAlign: 'center', width: '100%' }}>Save</Text>
                                </Button>
                            </View>


                        </Form>
                    </View>

                </Container>
            </ImageBackground >

        );
    }

}

const styles = StyleSheet.create({
    text_css: {
        color: 'white',
        width: '100%'
    },
})