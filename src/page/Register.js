/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Platform, TouchableOpacity, TextInput, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
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

export default class Login extends Component {
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
      registertype: 'normal'
    };

    //this.register = this.register.bind(this);
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

  submitSuccess() {
    if (this.state.password !== this.state.password_confirmation) {
      Alert.alert(
        'Passwords not mactch',
        'Passwords does not match !',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Ok' },
        ],
        { cancelable: false },
      )
    } else {
      var data = new FormData()
      data.append('email', this.state.email);
      data.append('name', this.state.name);
      data.append('password', this.state.password);
      data.append('password_confirmation', this.state.password_confirmation);
      data.append('registertype', this.state.registertype);

      var headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('X-Requested-With', 'text/xml');
      headers.append('Accept', 'application/json');

      //alert(JSON.stringify(data))
      //return;
      fetch("http://dev-fs.8d.ie/api/auth/signup", {
        method: "POST",
        headers: headers,
        body: data
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //alert(JSON.stringify(responseJson))
          if (responseJson["status"] == "success") {
            Alert.alert(
              'Verify email',
              responseJson["message"],
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                { text: 'Go To Loign', onPress: () => this.gotologin() },
              ],
              { cancelable: false },
            )
            //this.props.navigation.replace('AfterLogin', { Json_value: responseJson.data });
            //alert(JSON.stringify(responseJson["status"]));
          }
          else {
            //alert((responseJson["errors"]["email"][0]))
            if (responseJson["errors"]["email"][0] != "") {
              Alert.alert(
                'Verify email',
                responseJson["errors"]["email"][0],
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  { text: 'Go To Loign', onPress: () => this.gotologin() },
                ],
                { cancelable: false },
              )
            }
            //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
          }
        }).catch((error) => {
          //alert(error);
          //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
          //alert(error);
        });
    }
  }

  gotologin() {
    this.props.navigation.navigate('login');
  };

  submitFailed() {
    console.log("Submit Faield!");
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    return (

      <ImageBackground source={require('../images/b1.jpg')} style={{ width: '100%', height: '100%', position: "absolute", top: 0 }}>
        <Container style={{ backgroundColor: '#ff9500b3', width: '100%', }}>

          {/* <View style={{ flex: 1, alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}> */}
          <KeyboardAvoidingView scrollEnabled={false} resetScrollToCoords={{ x: 0, y: 0 }} style={{ flex: 1, alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
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


              <Field
                required
                component={InputField}
                validations={[required]}
                name="password"
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                customStyle={styles.text_css}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry={true}
              />

              <Field
                required
                component={InputField}
                validations={[required]}
                name="password_confirmation"
                value={this.state.password_confirmation}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({ password_confirmation: text })}
                customStyle={styles.text_css}
                placeholder="Password Re-Type"
                placeholderTextColor="white"
                errors={this.state.errors}
              />


              {/* {this.state.hasError ? <Text style={{ color: "#c0392b", textAlign: 'center', marginTop: 10 }}>{this.state.errorText}</Text> : null} */}

              <View style={{ width: '100%' }}>
                <Button onPress={() => this.submitForm()} style={{ backgroundColor: "white", borderRadius: 9, marginTop: 20 }}>
                  <Text style={{ color: '#808080', textAlign: 'center', width: '100%' }}>Register</Text>
                </Button>
              </View>

              <TouchableOpacity style={{ width: '100%' }} onPress={() => this.gotologin()}>
                <View style={{ width: '100%', marginTop: 50, marginLeft: 210 }}>
                  <Text style={{ color: 'white', textAlign: 'right' }} >Login</Text>
                </View>
              </TouchableOpacity>
            </Form>
          </KeyboardAvoidingView>
          {/* </View> */}

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
