/**
* This is the Login Page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Platform, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { Container, View, Left, Right, Button, Item, Input, Icon, Col, CheckBox } from 'native-base';
// import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import { Actions } from 'react-native-router-flux';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

// Our custom files and classes import
import Colors from '../Colors';
import Text from '../component/Text';
import Navbar from '../component/Navbar';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '415305768618-5ehirbcfbjg2inpegjv24a27jvu7qgnr.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember_me: false,
      device_id: DeviceInfo.getDeviceId(),
      device_type: Platform.OS,
      loading: true,
      hidePassword: true,
      user: null,
      name: '',
      social_id: '',
      registertype: ''
    };
    this.login = this.login.bind(this);
    this.submitSuccess = this.submitSuccess.bind(this);
  }


  submitSuccess = async (user) => {
    //alert(JSON.stringify(user))
    this.state.password = "123456";
    this.state.password_confirmation = "123456";

    var data = new FormData()
    data.append('email', this.state.email);
    data.append('name', this.state.name);
    data.append('social_id', this.state.social_id);
    data.append('registertype', this.state.registertype);
    data.append('password', "123456");
    data.append('password_confirmation', "123456");

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
          this.login()
          //this.props.navigation.replace('hotdeals', { Json_value: responseJson.data });
        }
        else {
          if (responseJson["errors"]["email"][0] == "The email field is required.") {
            Actions.saveemail({ user: this.state });
          } else {
            this.login()
          }
        }
      }).catch((error) => {
      });

  }


  googlesignIn = async () => {

    GoogleSignin.hasPlayServices()
      .then(() => {
        GoogleSignin.signIn()
          .then((user) => {
            var responseData = user;
            this.setState({ social_id: responseData.user.id })
            this.setState({ email: responseData.user["email"] })
            this.setState({ name: responseData.user["name"] })
            this.setState({ registertype: 'google' })

            //call api for check email Id      
            var data = new FormData()
            data.append("email", responseData.user["email"]);

            var headers = new Headers();
            headers.append('Accept', 'application/json');

            //return
            fetch("http://dev-fs.8d.ie/api/auth/check-email", {
              method: "POST",
              headers: headers,
              body: data
            })
              .then((response) => response.json())
              .then((responseJson) => {

                if (responseJson["status"] == "success") {
                  //call social login
                  this.sociallogin()
                }
                else {
                  //call social register
                  this.socialregister()
                }
              }).catch((error) => {
                //alert(error);
                this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                //alert(error);
              });


          })
          .catch((err) => {
          });
      }).catch(err => {
      });

  };

  handleFacebookLogin = async () => {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
    await FBLoginManager.loginWithPermissions(["email", "user_friends"], this.callbackfacebookfunction)
  }


  callbackfacebookfunction = async (error, data) => {
    if (!error) {
      if (data.type == "success") {
        //alert((data.profile))
        var api = `https://graph.facebook.com/v2.3/${data.credentials.userId}?fields=name,email&access_token=${data.credentials.token}`;
        fetch(api)
          .then((response) => response.json())
          .then((responseData) => {
            if (responseData.email != "" && responseData.email != null && responseData.email != undefined) {
              this.setState({ email: responseData.email })
              this.setState({ name: responseData.name })
              this.setState({ social_id: responseData.id })
              this.setState({ registertype: 'facebook' })

              //call api on email check
              var data = new FormData()
              data.append('email', responseData.email);

              var headers = new Headers();
              headers.append('Accept', 'application/json');

              fetch("http://dev-fs.8d.ie/api/auth/check-email", {
                method: "POST",
                headers: headers,
                body: data
              })
                .then((response) => response.json())
                .then((responseJson) => {

                  if (responseJson["status"] == "success") {
                    //call social login
                    this.sociallogin()
                  }
                  else {
                    //call social register
                    this.socialregister()
                  }
                }).catch((error) => {
                  //alert(error);
                  this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                  //alert(error);
                });
            } else {
              this.setState({ name: responseData.name })
              this.setState({ social_id: responseData.id })
              this.setState({ registertype: 'facebook' })

              var data = new FormData()
              data.append('social_id', responseData.id);
              data.append('registertype', 'facebook');

              //call api to check on social_id and registertype
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
                    //call social login
                    //this.sociallogin()
                    this.storeData(responseJson["customer"], responseJson["access_token"]);
                    setTimeout(() => {
                      this.props.navigation.navigate('hotdeals', { Json_value: responseJson["customer"] });
                    }, 1000);
                  }
                  else {
                    Actions.saveemail({ user: this.state });
                  }
                }).catch((error) => {
                  //alert(error);
                  this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                  //alert(error);
                });
            }
            //return responseData;
          })
      }
    }
  }


  managePasswordVisibility = async () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }


  storeData = async (data, access_token) => {
    let obj = {
      id: data.id,
      email: data.email,
      name: data.name,
      avatar: data.avatar,
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
          //alert(responseJson["access_token"])
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

  socialregister = async => {
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
        }
      }).catch((error) => {
        //alert(error);
        //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
        //alert(error);
      });
  }

  login = async () => {
    var data = new FormData()
    //data.append('email', 'info@orientalpantry.ie');
    data.append('email', this.state.email);
    data.append('password', this.state.password);
    data.append('remember_me', this.state.remember_me == true ? 1 : 0);
    data.append('device_id', this.state.device_id);
    data.append('device_type', this.state.device_type);

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    //alert(JSON.stringify(data))  
    fetch("http://dev-fs.8d.ie/api/auth/login", {
      method: "POST",
      headers: headers,
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson["status"] == "success") {
          //alert(responseJson["access_token"])
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


  gotoregister = async () => {
    this.props.navigation.replace('register');
  };


  render() {
    return (

      <ImageBackground source={require('../images/b1.jpg')} style={{ width: '100%', height: '100%', position: "absolute", top: 0 }}>
        <Container style={{ backgroundColor: '#ff9500b3', width: '100%', }}>

          <View style={{ flex: 1, alignItems: 'center', paddingLeft: 50, paddingRight: 50 }}>
            <View style={{ paddingTop: 20 }}>
              <Image
                source={require('../images/logo.png')}
              />
            </View>
            {/* <Form ref="form" onSubmit={this.login} shouldValidate={true}> */}
            <Item style={{ background: "transparent" }}>
              <Input style={styles.text_css} placeholder='Username' onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="white" placeholder="Username - or - Email" />
            </Item>
            <Item>
              <Input style={styles.text_css} placeholder='Password' onChangeText={(text) => this.setState({ password: text })} secureTextEntry={this.state.hidePassword} placeholderTextColor="white" />
              <TouchableOpacity activeOpacity={0.8} onPress={this.managePasswordVisibility}>
                {/* <Image source={(this.state.hidePassword) ? require('./assets/hide.png') : require('./assets/view.png')} style={styles.btnImage} /> */}
                {
                  this.state.hidePassword ? <Icon name="ios-eye" style={styles.text_css}></Icon> : <Icon name="ios-eye-off" style={styles.text_css}></Icon>
                }
              </TouchableOpacity>


            </Item>
            <View style={{ width: '100%' }}>
              <CheckBox style={{ marginTop: 10, width: '8%' }} checked={this.state.remember_me} onPress={() => this.setState({ remember_me: !this.state.remember_me })} />
              <Text style={{ color: 'white', textAlign: 'left', marginTop: -20, marginLeft: 40, width: '90%' }}>Remeber Me</Text>
            </View>

            {this.state.hasError ? <Text style={{ color: "#c0392b", textAlign: 'center', marginTop: 10 }}>{this.state.errorText}</Text> : null}
            <View style={{ width: '100%' }}>
              <Button onPress={() => this.login()} style={{ backgroundColor: "white", borderRadius: 9, marginTop: 20 }}>
                <Text style={{ color: '#808080', textAlign: 'center', width: '100%' }}>Login</Text>
              </Button>
            </View>
            <View style={{ width: '100%' }}>
              <Text style={{ color: 'white', textAlign: 'center', marginRight: 110 }}>forget your password ?</Text>
            </View>

            <View style={{ width: '100%' }}>
              <Button onPress={() => this.handleFacebookLogin()} style={{ backgroundColor: "white", width: '100%', borderRadius: 9, marginTop: 20 }}>
                <Icon name='logo-facebook' style={{ color: 'blue', width: '10%', marginLeft: 40 }} />
                <Text style={{ color: '#808080', textAlign: 'left', width: '70%' }}>
                  Login with facebook</Text>
              </Button>
            </View>


            <View style={{ width: '100%' }}>
              <Button onPress={() => this.googlesignIn()} style={{ backgroundColor: "white", borderRadius: 9, marginTop: 20 }}>
                <Icon name='logo-google' style={{ color: 'red', width: '10%', marginLeft: 40 }} />
                <Text style={{ color: '#808080', textAlign: 'left', width: '70%' }}>Login with Google</Text>
              </Button>
            </View>

            {/* <GoogleSigninButton
              style={{ width: '100%', height: 48, marginTop: 20, borderRadius: 10 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.white}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} /> */}

            <TouchableOpacity style={{ width: '100%' }} onPress={() => this.gotoregister()}>
              <View style={{ width: '100%', marginTop: 50, marginRight: 5 }}>
                <Text style={{ color: 'white', textAlign: 'right' }} >Register</Text>
              </View>
            </TouchableOpacity>
            {/* </Form> */}
          </View>

        </Container>
      </ImageBackground >

    );
  }
}

const styles = StyleSheet.create({
  text_css: {
    color: 'white',
  },
})
