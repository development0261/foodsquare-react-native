/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faChevronLeft, faQrcode, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-community/async-storage';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';


export default class VenderMenu extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            menu: [],
            logo: null,
            cover: null,
            commentscount: 0,
            storename: null
        };
        this._retrieveData();
    }

    _retrieveData = async () => {

        try {
            const value = await AsyncStorage.getItem('visited_onces');
            if (value === null || value === 'null' || value === "") {
                this.props.navigation.replace('login');
            }
        } catch (error) {
        }
    };

    componentWillMount() {
        this.venderinfo();
    }

    venderinfo = async () => {
        try {

            var data = new FormData()
            data.append('id', this.state.id);


            var headers = new Headers();
            headers.append('Accept', 'application/json');


            fetch("http://dev-fs.8d.ie/api/menu/get-menu", {
                method: "POST",
                headers: headers,
                body: data
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson["status"] == "success") {
                        this.setState({ menu: responseJson["data"] })
                    }

                }).catch((error) => {
                    //alert(JSON.stringify(error))
                    //alert(error);
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });




            var headers = new Headers();
            headers.append('Accept', 'application/json');

            fetch("http://dev-fs.8d.ie/api/vender/venders-detail", {
                method: "POST",
                headers: headers,
                body: data
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson["status"] == "success") {
                        this.setState({ logo: responseJson["data"][0].logo })
                        this.setState({ cover: responseJson["data"][0].cover })
                        this.setState({ commentscount: responseJson["data"][0].comment.length })
                        this.setState({ storename: responseJson["data"][0].name });
                    }
                }).catch((error) => {
                    alert(JSON.stringify(error))
                    //alert(error);
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });
        } catch (e) {
        }
    }

    render() {
        return (
            <Container style={{ position: 'relative', backgroundColor: '#efeff4' }}>
                <ImageBackground source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.cover }} style={{ height: 250 }}>
                    <Header
                        style={{ zIndex: -1, opacity: 0.8 }}
                        backgroundColor='#ebb76e'
                        androidStatusBarColor={Colors.statusBarColor}
                        noShadow={true}
                        transparent
                    >
                        <Left>
                            <Button transparent onPress={() => Actions.hotdeals()}>
                                <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                            </Button>
                        </Left>
                        <Body >
                            <Grid style={{ width: '100%' }}>
                                <Col style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Title style={styles.title}>{this.state.storename}</Title>
                                </Col>
                                <Col style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}>
                                    <FontAwesomeIcon icon={faEllipsisH} size={25} style={{ color: 'white' }} onPress={() => Actions.venderdetails()} />
                                </Col>
                            </Grid>
                        </Body>
                    </Header>

                </ImageBackground>
                <Image
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52)', width: '2%', height: '2%', padding: 20, marginTop: 230, marginLeft: 160, zIndex: 1, position: 'absolute', borderRadius: 100 }} // must be passed from the parent, the number may vary depending upon your screen size
                    source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.logo }}
                >
                </Image>
                <Content style={{ flex: 1, backgroundColor: 'white', zIndex: -1 }}>
                    <View style={styles.view}>
                        <Grid >
                            <Row style={styles.rows}>
                                <Col style={styles.ratting}>
                                    <Text style={styles.text}> 120 </Text>
                                    <Text style={styles.text}> Rattings </Text>
                                </Col>
                                <Col style={styles.ratting}>
                                    <Text style={styles.text}> {this.state.commentscount} </Text>
                                    <Text style={styles.text}> Comments </Text>
                                </Col>
                                <Col style={styles.ratting}>
                                    <Text style={styles.text}> 1000 </Text>
                                    <Text style={styles.text}> Followers </Text>
                                </Col>
                                <Col style={styles.ratting}>
                                    <Text style={styles.text}> 500 </Text>
                                    <Text style={styles.text}> Photos </Text>
                                </Col>
                            </Row>
                            <Row style={styles.rowicon}>
                                <Col style={styles.ratting} >
                                    <Button onPress={() => Actions.vender()} transparent>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>

                                            <Image
                                                style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}
                                                source={require('../images/001-ingredients.png')}
                                            ></Image>

                                        </View>
                                    </Button>
                                    <Text style={styles.text}> Ingredients </Text>

                                </Col>
                                <Col style={styles.col}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                        <Image
                                            style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}
                                            source={require('../images/002-wedding-dinner1.png')}
                                        ></Image>
                                    </View>
                                    <Text style={styles.text}> Menu </Text>
                                </Col>
                                <Col style={styles.col}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                        <Image
                                            style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}
                                            source={require('../images/003-top-games-star.png')}
                                        ></Image>
                                    </View>
                                    <Text style={styles.text}> Popular </Text>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                    <View style={{ zIndex: 1, backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        {this.renderResult()}
                    </View>
                </Content>
                {/* <Footer style={{ backgroundColor: Colors.navbarBackgroundColor }} backgroundColor={Colors.navbarBackgroundColor} >
                    <Left>
                        <Button transparent onPress={() => Actions.hotdeals()}>
                            <FontAwesomeIcon icon={faQrcode} size={25} style={{ color: 'white', left: 20, width: 100 }} />
                        </Button>
                    </Left>
                    <Body >
                        <View style={styles.body} >
                            <Text onPress={() => Actions.dishcreate()} style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20 }} >Create Dish</Text>
                        </View>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.dishlist()}>
                            <Image
                                style={{ alignItems: 'center', justifyContent: 'center', width: 35, height: 35, right: 20 }} // must be passed from the parent, the number may vary depending upon your screen size
                                source={require('../images/dish-create.png')}
                            >
                            </Image>
                        </Button>
                    </Right>
                </Footer> */}
            </Container >

        )
    }


    renderResult() {
        let cat = [];
        for (var i = 0; i < this.state.menu.length; i++) {
            // alert(this.state.hotdishes[i].id)          
            cat.push(
                // <Card style={{ zIndex: 4, opacity: 1, position: 'relative', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <View style={styles.submit} underlayColor='#fff'>
                    <View style={{ flex: 1 }}>
                        {this.state.menu[i].cover == ""
                            ?
                            <Image style={styles.image} source={require('../images/b1.jpg')} />
                            :
                            <Image style={styles.image} source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.menu[i].cover }} />
                        }
                    </View>
                    <View style={{ flex: 1, shadowColor: 'black', shadowOpacity: 1.0, shadowOffset: { width: 10, height: 10, }, flexDirection: 'row', zIndex: 1, marginTop: -22, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ height: 30 }} >
                                <Grid>
                                    <Col size={4}>
                                        <Text style={{ marginLeft: 10, fontSize: 16, color: '#ff9500' }}>
                                            {this.state.menu[i].name}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ fontSize: 14 }}>
                                            $ {this.state.menu[i].rate}
                                        </Text>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={{ height: 115, width: '100%', marginRight: 80, marginTop: 5 }}>
                                <Grid style={{ width: '100%' }}>
                                    <Row>
                                        {this.renderingredient(this.state.menu[i].ingredient)}
                                        <Col style={{ paddingLeft: 2, paddingTop: 5 }} onPress={() => this.openGallery()}>
                                            <Image source={require('../images/QRcode.jpg')} />
                                        </Col>
                                    </Row>
                                </Grid>
                            </View>
                            <View style={{ height: 49, marginLeft: -12, marginRight: -12, padding: 10, backgroundColor: '#ddd', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} >
                                <Grid style={{ width: '100%' }}>
                                    <Row >
                                        <Col >
                                            <Image style={styles.imagefooter} source={require('../images/003-share_2.png')} >
                                            </Image>
                                        </Col>
                                        <Col >
                                            <Text style={styles.footertext}>{this.state.menu[i].share}</Text>
                                        </Col>
                                        <Col >
                                            <Image style={styles.imagefooter} source={require('../images/002-like.png')} />
                                        </Col>
                                        <Col >
                                            <Text style={styles.footertext}>{this.state.menu[i].like}</Text>
                                        </Col>
                                        <Col >
                                            <Image style={styles.imagefooter} source={require('../images/004-chat.png')} />
                                        </Col>
                                        <Col >
                                            <Text style={styles.footertext}>{this.state.menu[i].comment}</Text>
                                        </Col>
                                    </Row>
                                </Grid>
                            </View>
                        </View>
                    </View>
                </View >
                // </Card>
            );
        }
        return cat;
    }


    renderingredient(ingredientdata) {
        let ingredient = [];
        for (var i = 0; i < ingredientdata.length; i += 2) {
            if (i <= 5) {
                if (ingredientdata[i + 1]) {
                    ingredient.push(
                        <Col style={{ width: '25%' }}>
                            <Col style={{ padding: 12 }}>
                                <Image style={styles.image} source={{ uri: "http://dev-fs.8d.ie/storage/" + ingredientdata[i].cover }} />
                            </Col>
                            <Col style={{ padding: 12 }}>
                                <Image style={styles.image} source={{ uri: "http://dev-fs.8d.ie/storage/" + ingredientdata[i + 1].cover }} />
                            </Col>
                        </Col>)
                } else {
                    ingredient.push(
                        <Col style={{ width: '25%' }}>
                            <Col style={{ padding: 12 }}>
                                <Image style={styles.imageind} source={{ uri: "http://dev-fs.8d.ie/storage/" + ingredientdata[i].cover }} />
                            </Col>
                            <Col style={{ padding: 12 }}>
                                <Image style={styles.imageind} source={require('../images/fresh-spring-onions-8-stems.jpg')} />
                            </Col>
                        </Col>)
                }
            }
        }
        return ingredient;
    }

    openGallery = () => {
        Actions.imageGallery({ images: [require('../images/QRcode.jpg')], position: 0 });
    }


}


const styles = {
    submit: {
        flex: 1,
        height: 375,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 25,
        left: 5
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100',

    },
    view: {
        flex: 1,
        height: 150,
        backgroundColor: '#efeff4',
        width: '100%',
        padding: 8,
    },
    rows: {
        height: '45%',
        backgroundColor: '#efeff4',
        border: 1,
        borderBottomWidth: 1,
        borderColor: '#ccccde'

    },
    ratting: {
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 10
    },
    col: {
        alignItems: 'center',
        justifyContent: 'center',
        border: 1,
        borderLeftWidth: 1,
        borderColor: '#ccccde'
        // marginLeft: 10
    },
    rowicon: {
        marginTop: 10,
        padding: 8,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        flex: 1,
        marginTop: -20
    },
    imagefooter: {
        width: '25%',
        flex: 1,
        marginTop: 1,
        marginLeft: 20,
        padding: 15
    },
    footertext: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        padding: 5
    }
};
