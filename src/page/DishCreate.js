/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Picker, Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faChevronLeft, faQrcode, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-community/async-storage';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';


export default class DishCreate extends Component {


    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            ingredientGroups: [],
            logo: null,
            cover: null,
            commentscount: 0,
            storename: null,
            basketItems: [],
            customer_id: null,
            ingList: []
        };
        this._retrieveData();
    }

    _retrieveData = async () => {

        try {
            AsyncStorage.getItem('visited_onces', (err, res) => {
                if (res === null || res === 'null' || res === "") {
                    this.props.navigation.replace('login');
                } else {
                    var user = JSON.parse(res)
                    //alert(user.id)
                    this.setState({ customer_id: user.id })
                    this._getcartitem();
                    this.venderinfo();
                }
            });

            AsyncStorage.getItem("INGREDIENT", (err, res) => {
                if (!res) {
                    global.ingList = []
                }
                else {
                    global.ingList = JSON.parse(res)

                }
                this.setState({ ingList: global.ingList })
                //alert(this.state.ingList.length)
            });
        } catch (error) {
        }
    };

    _getcartitem = async () => {

        var data = new FormData()
        data.append('customer_id', this.state.customer_id);

        var headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch("http://dev-fs.8d.ie/api/dishcart/customer-cart-dishes", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["status"] == "success") {
                    this.setState({ basketItems: responseJson["data"] })
                }
            }).catch((error) => {
                //alert(error);
                //this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                //alert(error);
            });
    }

    venderinfo = async () => {

        try {
            const value = await AsyncStorage.getItem('visited_onces');
            const access_token = JSON.parse(value).access_token

            let auth = 'Bearer ' + access_token;
            var headers = new Headers();
            headers.append("Authorization", auth);


            fetch("http://dev-fs.8d.ie/api/venders/" + this.state.id + "/ingredient-groups", {
                method: "GET",
                headers: headers,
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson["ingredientGroups"].length > 0) {
                        this.setState({ ingredientGroups: responseJson["ingredientGroups"] })
                    } else {

                    }

                }).catch((error) => {
                    //alert(error);
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });


            var data = new FormData()
            data.append('id', this.state.id);

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
                <ImageBackground source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.cover }} style={{ height: 300 }}>
                    <Header
                        style={{ zIndex: -1, opacity: 0.8 }}
                        backgroundColor='#ebb76e'
                        androidStatusBarColor={Colors.statusBarColor}
                        noShadow={true}
                        transparent
                    >
                        <Left>
                            <Button transparent onPress={() => Actions.vender()}>
                                <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                            </Button>
                        </Left>
                        <Body >
                            <Grid style={{ width: '100%' }}>
                                <Col style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Title style={styles.title}>{this.state.storename}</Title>
                                </Col>
                                {/* {this.state.ingList.length > 0 ? */}
                                <Col style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}>
                                    <FontAwesomeIcon icon={faEllipsisH} size={25} style={{ color: 'white' }} onPress={() => Actions.addtobasket()} />
                                </Col>
                                {/* :
                                    <View></View>
                                } */}
                            </Grid>
                        </Body>
                    </Header>
                </ImageBackground>
                <Image
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52)', width: '2%', height: '2%', padding: 20, marginTop: 280, marginLeft: 160, zIndex: 1, position: 'absolute', borderRadius: 100 }} // must be passed from the parent, the number may vary depending upon your screen size
                    source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.logo }}
                >
                </Image>
                <Content style={{ flex: 1, backgroundColor: 'transparent', zIndex: -1 }}>
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
                                <Col style={styles.ratting}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                        <Image
                                            style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}
                                            source={require('../images/001-ingredients1.png')}
                                        ></Image>
                                    </View>
                                    <Text style={styles.text}> Ingredients </Text>
                                </Col>
                                <Col style={styles.col}>
                                    <Button onPress={() => Actions.vendermenu()} transparent>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} >
                                            <Image
                                                style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40 }}
                                                source={require('../images/002-wedding-dinner.png')}
                                            ></Image>
                                        </View>
                                    </Button>
                                    <Text style={styles.text}> Menu </Text>
                                </Col>
                                <Col style={styles.col}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }} >
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
                    <View style={styles.viewingredients}>
                        {this.renderResult()}
                    </View>
                </Content>
                <Footer
                    style={{ zIndex: 1, opacity: 2, position: 'absolute', bottom: 0 }}
                    backgroundColor='transparent'
                    noShadow={true}
                    transparent
                >
                    <Button style={styles.MainContainer} onPress={() => Actions.dishlist()}>
                        {/* <Text>dsgffg</Text> */}
                        <View style={styles.viewfooterimg}>
                            <Image
                                style={{ flex: 1, width: 35, height: 35 }} // must be passed from the parent, the number may vary depending upon your screen size
                                source={require('../images/dish-create.png')}
                            >
                            </Image>
                        </View>
                        {this.state.basketItems.length > 0 ?
                            <View style={{ position: 'absolute', top: -3, right: -3, justifyContent: 'center', alignItems: 'center', height: 15, width: 15, backgroundColor: 'red', borderRadius: 200 / 2 }}>
                                <Text style={{ color: 'white' }}>{this.state.basketItems.length}</Text>
                            </View>
                            :
                            <View></View>
                        }
                    </Button>
                </Footer>
            </Container >

        )
    }

    callparent() {
        alert("calll")
    }


    renderResult() {
        let items = [];
        let ingredientGroups = [];
        for (var i = 0; i < this.state.ingredientGroups.length; i++) {
            this.state.ingredientGroups[i].isgroup = true;
            this.state.ingredientGroups[i].iscreate = true;
            ingredientGroups.push(this.state.ingredientGroups[i])
            for (var j = 0; j < this.state.ingredientGroups[i].ingredients.length; j++) {
                this.state.ingredientGroups[i].ingredients[j].isgroup = false;
                this.state.ingredientGroups[i].ingredients[j].iscreate = true;
                this.state.ingredientGroups[i].ingredients[j].groupname = this.state.ingredientGroups[i].name;
                this.state.ingredientGroups[i].ingredients[j].groupmax = this.state.ingredientGroups[i].max;
                ingredientGroups.push(this.state.ingredientGroups[i].ingredients[j])
            }
        }
        for (var i = 0; i < ingredientGroups.length; i += 3) {
            if (ingredientGroups[i + 1] && ingredientGroups[i + 2]) {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} action={this.callparent} />
                        <Product key={ingredientGroups[i + 1].id} product={ingredientGroups[i + 1]} action={this.callparent} />
                        <Product key={ingredientGroups[i + 2].id} product={ingredientGroups[i + 2]} action={this.callparent} />
                    </Grid>
                );
            } else if (ingredientGroups[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} action={this.callparent} />
                        <Product key={ingredientGroups[i + 1].id} product={ingredientGroups[i + 1]} action={this.callparent} />
                        <Col key={i} />
                    </Grid>
                );
            }
            else {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} action={this.callparent} />
                        <Col key={i} />
                        <Col key={i} />
                    </Grid>
                );
            }
        }
        return items;
    }
}


const styles = {
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 200 / 2,
        height: 50,
        width: 50,
        backgroundColor: '#ff9500',
        borderColor: '#ff9500',
        left: 120,
        bottom: 20
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 25
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
    }
    ,
    viewingredients: {
        padding: 5,
    }
    ,
    viewfooterimg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
};
