/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Modal, Image, TouchableHighlight, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Footer, Segment, Body, Title, Item, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faChevronLeft, faQrcode, faCamera } from '@fortawesome/free-solid-svg-icons'
import { Form, Field } from 'react-native-validate-form';
import RNImagePicker from 'react-native-image-picker';

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';
import Colors from '../Colors';
import Product from '../component/Product';
import InputField from "../component/InputField";

const required = value => (value ? undefined : 'This is a required field.');
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(value) ? 'Please provide a valid email address.' : undefined;
const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("avatar", {
        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });
    return data;
};
export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            phone_number: '',
            password: '',
            password_confirmation: '',
            address: '',
            postcode: '',
            errors: [],
            hasError: false,
            errorText: '',
            modalVisible: false,
            uri: '',
            avatar: null
        };
    }

    componentWillMount() {
        AsyncStorage.getItem("visited_onces", (err, res) => {
            if (!res)
                this.setState({ cartItems: [] });
            else {
                var userdata = JSON.parse(res)
                this.setState({ id: userdata.id });
                this.setState({ email: userdata.email });
                this.setState({ name: userdata.name });
                this.setState({ access_token: userdata.access_token });
                this.calluserinfo();
            }
        });
    }

    calluserinfo = async () => {

        var data = new FormData()
        data.append('id', this.state.id);

        var headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch("http://dev-fs.8d.ie/api/userInfo", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ phone_number: responseJson[0].phone_number });
                this.setState({ address: responseJson[0].address });
                this.setState({ postcode: responseJson[0].postcode });
                this.setState({ uri: "http://dev-fs.8d.ie/img/" + responseJson[0].avatar });

            });
    }

    emailvalidate = (text) => {
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
        // alert("calll")
        var data = new FormData()
        data.append('id', this.state.id);
        data.append('email', this.state.email);
        data.append('phone', this.state.phone_number);
        data.append('address', this.state.address);
        data.append('postcode', this.state.postcode);
        if (this.state.password != "") {
            data.append('password', this.state.password);
        }

        var headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch("http://dev-fs.8d.ie/api/edit/user_profile", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["status"] == "success") {
                    //alert(this.state.id)
                    //alert(JSON.stringify(this.state.avatar))
                    //return;
                    if (this.state.avatar) {

                        // var data = new FormData()
                        // data.append('id', this.state.id);
                        // data.append('avatar', this.state.avatar);

                        var headers = new Headers();
                        headers.append('Accept', 'application/json');

                        fetch("http://dev-fs.8d.ie/api/edit/edit_profile_pitcure", {
                            method: "POST",
                            headers: headers,
                            body: createFormData(this.state.avatar, { id: this.state.id })
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson["status"] == "success") {

                                    AsyncStorage.getItem("visited_onces", (err, res) => {
                                        if (!res)
                                            this.setState({ cartItems: [] });
                                        else {
                                            var userdata = JSON.parse(res)
                                            userdata.avatar = responseJson["name"]
                                            AsyncStorage.setItem('visited_onces', JSON.stringify(userdata));
                                        }
                                    });

                                    Alert.alert(
                                        'Success',
                                        responseJson["message"],
                                        [
                                            { text: 'Ok' },
                                        ],
                                        { cancelable: false },
                                    )
                                }
                            })

                    }
                    else {
                        Alert.alert(
                            'Success',
                            responseJson["message"],
                            [
                                { text: 'Ok' },
                            ],
                            { cancelable: false },
                        )
                    }
                } else {
                    Alert.alert(
                        'Error',
                        responseJson["message"],
                        [
                            { text: 'Ok' },
                        ],
                        { cancelable: false },
                    )
                }
            })
    }

    resetPassword() {

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
            data.append('id', this.state.id);
            data.append('password', this.state.password);


            var headers = new Headers();
            headers.append('Accept', 'application/json');

            fetch("http://dev-fs.8d.ie/api/edit/user_password", {
                method: "POST",
                headers: headers,
                body: data
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson["status"] == "success") {
                        Alert.alert(
                            'Success',
                            responseJson["message"],
                            [
                                { text: 'Ok' },
                            ],
                            { cancelable: false },
                        )
                    } else {
                        Alert.alert(
                            'Error',
                            responseJson["message"],
                            [
                                { text: 'Ok' },
                            ],
                            { cancelable: false },
                        )
                    }
                })
        }
    }

    submitFailed() {
        console.log("Submit Faield!");
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    opencamera() {
        const options = {
            noData: true,
        }
        RNImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                this.setState({
                    uri: response.uri,
                    avatar: response
                });
            }
        });
    }


    render() {
        return (
            <Container style={{ backgroundColor: '#ebeff0', paddingTop: 25, position: 'relative' }}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modalstyle}>
                        <View style={styles.modalheader}>
                            <Text style={styles.modaltext}>Change Paasword</Text>
                            <Text style={styles.modalsubtext}>You Will be logout after confirm</Text>
                        </View>
                        <View style={styles.modaltextbody}>
                            <TextInput
                                required
                                validations={[required]}
                                name="password"
                                value={this.state.password}
                                onChangeText={(text) => this.setState({ password: text })}
                                style={styles.text_css}
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor="#ccccde"
                            />

                            <TextInput
                                required
                                validations={[required]}
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ password_confirmation: text })}
                                style={styles.text_css}
                                placeholder="Password Re-Type"
                                placeholderTextColor="#ccccde"
                            />
                        </View>
                        <View style={styles.modaltextfooter}>
                            <Grid style={styles.modalbuttongrid}>
                                <Col style={styles.modalbuttongridcol}>
                                    <Button onPress={() => this.setModalVisible(!this.state.modalVisible)} style={{ backgroundColor: Colors.navbarBackgroundColor, borderWidth: 1, borderColor: Colors.navbarBackgroundColor, borderRadius: 20 }} block iconLeft>
                                        <Text style={{ color: 'white' }}>Cancel</Text>
                                    </Button>
                                </Col>
                                <Col style={{ paddingLeft: 5, paddingRight: 10 }}>
                                    <Button onPress={() => this.resetPassword()} style={{ backgroundColor: Colors.navbarBackgroundColor, borderWidth: 1, borderColor: Colors.navbarBackgroundColor, borderRadius: 20 }} block iconRight transparent>
                                        <Text style={{ color: 'white' }}>Confirm</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                    </View>
                </Modal>

                <Header style={{ backgroundColor: Colors.navbarBackgroundColor, height: 160 }} backgroundColor={Colors.navbarBackgroundColor} androidStatusBarColor={Colors.statusBarColor} hasSegment>
                    <Left style={{ paddingBottom: 100, left: 0 }} >
                        <Button transparent onPress={() => Actions.userprofile()} transparent>
                            <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Body style={{ height: '100%', marginRight: 25 }}>
                        <Grid style={{ width: '100%', height: '100%' }}>
                            <Col style={{ zIndex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center', width: '80%' }}>
                                <View style={styles.MainContainer}>
                                    {this.state.uri == ""
                                        ? <Image style={{ width: 95, height: 95, borderRadius: 200 / 2 }} source={require("../images/logonew.png")}  >
                                        </Image>
                                        : <Image style={{ width: 95, height: 95, borderRadius: 200 / 2 }} source={{ uri: this.state.uri }}  >
                                        </Image>
                                    }
                                </View>
                                <Text style={{ color: 'white', fontStyle: 'bolder', paddingLeft: 10, justifyContent: 'center', alignItems: 'center', }}>{this.state.name ? this.state.name : this.state.email}</Text>
                            </Col>
                            <Col style={{ zIndex: 4, position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '10%', height: '50%', marginTop: 40, right: 60 }}>
                                <Button onPress={() => this.opencamera()} transparent>
                                    <View style={styles.MainContainericon} >
                                        <FontAwesomeIcon icon={faCamera} style={{ color: '#413d3d' }} size={25} />
                                    </View>
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                                <FontAwesomeIcon icon={faQrcode} style={{ color: 'white', paddingLeft: 20 }} size={35} />
                            </Col>
                        </Grid>
                    </Body>
                </Header>

                <Segment style={{ backgroundColor: Colors.navbarBackgroundColor, width: '100%' }}>
                    <View style={{ width: '33%', alignItems: 'center', }}>
                        <Text style={{ color: 'white' }}>Order</Text>
                        <Text style={{ color: 'white' }}>55</Text>
                    </View>
                    <View style={{ width: '33%', alignItems: 'center', }}>
                        <Text style={{ color: 'white' }}>Comment</Text>
                        <Text style={{ color: 'white' }}>55</Text>
                    </View>
                    <View style={{ width: '33%', alignItems: 'center', }}>
                        <Text style={{ color: 'white' }}>Share</Text>
                        <Text style={{ color: 'white' }}>55</Text>
                    </View>
                </Segment>
                <Content padder>

                    <Form ref={(ref) => this.myForm = ref}
                        validate={true}
                        submit={this.submitSuccess.bind(this)}
                        failed={this.submitFailed.bind(this)}
                        errors={this.state.errors}>
                        <View style={{ position: 'relative' }}>
                            <Text style={styles.text}> Email </Text>

                            <Field
                                required
                                component={InputField}
                                validations={[required, email]}
                                name="email"
                                value={this.state.email}
                                onChangeText={text => this.emailvalidate(text)}
                                customStyle={styles.input}
                                errors={this.state.errors}
                            />
                        </View>
                        <View style={{ position: 'relative', width: '100%' }}>
                            <Text style={styles.text}> Phone </Text>

                            <Field
                                // required
                                component={InputField}
                                // validations={[required]}
                                name="Phone"
                                value={this.state.phone_number}
                                onChangeText={(text) => this.setState({ phone_number: text })}
                                customStyle={styles.input}
                            />
                        </View>
                        <View style={{ position: 'relative' }}>
                            <Text style={styles.text}> Address </Text>

                            <Field
                                required
                                component={InputField}
                                validations={[required]}
                                name="Address"
                                value={this.state.address}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ address: text })}
                                customStyle={styles.input}
                                errors={this.state.errors}
                                numberOfLines={5}
                                multiline={true}
                            />
                        </View>
                        <View style={{ position: 'relative' }}>
                            <Text style={styles.text}> Postcode </Text>

                            <Field
                                component={InputField}
                                name="Postcode"
                                value={this.state.postcode}
                                onChangeText={(text) => this.setState({ postcode: text })}
                                customStyle={styles.input}
                            />
                        </View>

                    </Form>
                </Content>
                <View style={{ position: 'relative' }}>
                    <Text style={{ color: 'Black', marginBottom: 15, marginLeft: 10, borderBottomWidth: 1, width: '33%' }}
                        onPress={() => this.setModalVisible(true)}>
                        Change Paasword
                    </Text>
                </View>
                <Footer style={{ backgroundColor: Colors.navbarBackgroundColor }}  >
                    <Button transparent onPress={() => this.submitForm()}>
                        <View  >
                            <Text style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20 }} >Save Your Detail</Text>
                        </View>
                    </Button>
                </Footer>
            </Container>
        );
    }


}



const styles = {
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: -10
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100',
    },
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 200 / 2,
        height: 100,
        width: 100,
    },
    MainContainericon: {
        backgroundColor: "#ffdba9",
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 0.5,
        borderRadius: 200 / 2,
        height: 38,
        width: 38,
    },
    input: {
        width: '80%',
        marginTop: 15,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    text: {
        position: 'absolute', backgroundColor: 'transparent', fontSize: 20, fontStyle: 'bolder', fontWeight: '500'
    },
    modalstyle: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#efeff4',
        marginTop: 150,
        marginBottom: 275,
        marginLeft: 40,
        marginRight: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#707070"
    },
    modalheader: {
        flex: 1,
        // alignItems: 'center',
        marginTop: 10,
        border: 1,
        width: '100%',
        paddingLeft: 15,
        paddingRight: 15
    }
    ,
    modaltext: {
        textAlign: 'center',
        // alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: "#ccccde",
        fontStyle: 'bold',
        lineHeight: 30,
    },
    modalsubtext: {
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        color: "#ccccde",
        fontStyle: 'bold',
    },
    text_css: {
        width: '90%',
        borderBottomWidth: 1,
        borderColor: "#ccccde",
    },
    modaltextbody: {
        marginTop: -30,
        flex: 1,
        alignItems: 'center',
        width: '100%',

    },
    modaltextfooter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    modalbuttongrid: {
        marginTop: 25,
        marginBottom: 10

    },
    modalbuttongridcol: {
        paddingLeft: 10,
        paddingRight: 5

    }
};