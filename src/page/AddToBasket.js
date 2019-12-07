/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, ImageBackground, Modal } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faChevronLeft, faQrcode, faEllipsisH, faSortUp } from '@fortawesome/free-solid-svg-icons'
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';


export default class AddToBasket extends Component {


    constructor(props) {
        super(props);

        // global.ingList = [];
        this.state = {
            id: 1,
            ingredientGroups: [],
            logo: null,
            cover: null,
            commentscount: 0,
            storename: null,
            basketItems: [],
            ingList: [],
            total: 0,
            name: null,
            access_token: null,
            ingredients: [],
            customer_id: null,
            modalVisible: true
        };

        AsyncStorage.getItem("INGREDIENT", (err, res) => {
            if (!res) {
                global.ingList = []
            }
            else {
                global.ingList = JSON.parse(res)
            }

            global.ingList.map((item) => {
                var total = 0;
                total += parseFloat(item.price) * parseInt(item.quantity);
                this.setState({ total: total });
            });
        });



        this._retrieveData();
    }

    _retrieveData = async () => {
        try {
            AsyncStorage.getItem('visited_onces', (err, res) => {

                var user = JSON.parse(res)
                // alert(user.name)
                // if (value === null || value === 'null' || value === "") {
                //     this.props.navigation.replace('login');
                // }
                // else {             
                this.setState({ customer_id: user.id })
                this.setState({ name: user.name })
                this.setState({ access_token: user.access_token })
                // }
            });
        } catch (error) {
        }
    };

    componentWillMount() {
        this.venderinfo();
    }

    venderinfo = async () => {
        try {
            const value = await AsyncStorage.getItem('visited_onces');
            const access_token = JSON.parse(value).access_token

            //alert(access_token)
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
                    alert(JSON.stringify(error))
                    //alert(error);
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });

        } catch (e) {
        }
    }

    setModalVisible(visible) {
        alert("calll")
        //alert(visible)
        this.setState({ modalVisible: visible });
    }


    render() {
        var left = (
            <Left style={{ flex: 1 }}>
                <Button style={{ flex: 1, marginBottom: 10 }} onPress={() => Actions.dishcreate()} transparent>
                    <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                </Button>
            </Left>
        );
        var right = (
            <Right style={{ flex: 1, marginBottom: 10 }}>
                <Button onPress={() => this.setModalVisible(false)} >
                    <FontAwesomeIcon icon={faEllipsisH} size={25} style={{ color: 'white' }} />
                </Button>
            </Right>
        );
        return (
            <Container style={{ position: 'relative', backgroundColor: '#efeff4' }}>

                <Navbar left={left} right={right} title="Custom Dish" marginLeft={5} fontSize={18} height={90} />
                <Content style={{ flex: 1, backgroundColor: 'transparent', zIndex: -1 }}>
                    <View style={{ flex: 1, width: '10%', marginLeft: 100 }}>
                        <Modal visible={this.state.modalVisible}
                            transparent={true}
                            styles={{ backgroundColor: 'green', right: 0 }}
                        >

                            <View style={{ flex: 1, position: 'relative', zIndex: 4, backgroundColor: '#ccccde', width: 130, height: 60, marginBottom: 495, marginLeft: 225, marginTop: 70, right: 0, borderRadius: 8, borderColor: 'transparent', borderWidth: 1 }}>
                                <View style={{ position: 'relative', zIndex: -4, marginTop: -12, marginLeft: 80, }}>
                                    <FontAwesomeIcon icon={faSortUp} size={30} style={{ color: '#ccccde', borderColor: 'red' }} />
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style={styles.viewingredients}>
                        {this.renderResult()}
                    </View>
                </Content>
                <Footer style={{ backgroundColor: Colors.navbarBackgroundColor }} backgroundColor={Colors.navbarBackgroundColor} >
                    <Body >
                        <View style={styles.body} >
                            <Text onPress={() => this.addtobasket()} style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20 }} >Add To Basket Total <Text style={{ color: 'white', fontSize: 25 }}> $ <Text style={{ color: 'white', fontSize: 15 }}>{this.state.total}</Text></Text></Text>
                        </View>
                    </Body>
                </Footer>
            </Container >

        )
    }

    addtobasket() {

        try {

            var ingredientsList = [];

            for (var i = 0; i < global.ingList.length; i++) {
                var obj = new Object();
                obj.id = global.ingList[i].id;
                obj.qty = global.ingList[i].quantity;
                ingredientsList.push(obj)
            }


            let auth = 'Bearer ' + this.state.access_token;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append("Authorization", auth);

            var data = {
                "vender_id": 1,
                "name": "custom dish",
                "description": "This dish made by " + this.state.name,
                "ingredients": ingredientsList
            }

            //alert(data)

            //return
            fetch("http://dev-fs.8d.ie/api/dishes", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })
                .then((response) => response.json())
                .then((responseJson) => {


                    if (responseJson["dish"] != undefined) {

                        var headers = new Headers();
                        headers.append('Accept', 'application/json');

                        var data = new FormData()
                        data.append('dish_id', responseJson["dish"][0].id);
                        data.append('customer_id', this.state.customer_id);
                        data.append('vender_id', "1");
                        data.append('quantity', "1");

                        fetch("http://dev-fs.8d.ie/api/dishcart/add-dish-cart", {
                            method: "POST",
                            headers: headers,
                            body: data
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {

                                if (responseJson["status"] == "success") {

                                    global.ingList = []
                                    AsyncStorage.setItem("INGREDIENT", "");

                                    Toast.show({
                                        text: 'Dish add to your basket!',
                                        position: 'bottom',
                                        type: 'success',
                                        buttonText: 'Dismiss',
                                        duration: 3000
                                    });
                                    setTimeout(() => {
                                        Actions.dishcreate();
                                    }, 1000);
                                }
                                else {
                                    Toast.show({
                                        text: 'Dish does not add to your basket!',
                                        position: 'bottom',
                                        type: 'danger',
                                        buttonText: 'Dismiss',
                                        duration: 3000
                                    });
                                }

                            })

                        //this.setState({ ingredientGroups: responseJson["ingredientGroups"] })
                    } else {

                    }

                }).catch((error) => {
                    alert((error.message))
                    //alert(error);
                    this.setState({ hasError: true, errorText: 'Invalid username or password !' });
                    //alert(error);
                });

        } catch (e) {
            alert(JSON.stringify(e))
        }
    }


    renderResult() {
        let items = [];
        let ingredientGroups = [];
        for (var i = 0; i < this.state.ingredientGroups.length; i++) {
            this.state.ingredientGroups[i].isgroup = true;
            ingredientGroups.push(this.state.ingredientGroups[i])
            for (var j = 0; j < this.state.ingredientGroups[i].ingredients.length; j++) {
                this.state.ingredientGroups[i].ingredients[j].isgroup = false;
                ingredientGroups.push(this.state.ingredientGroups[i].ingredients[j])
            }
        }
        for (var i = 0; i < ingredientGroups.length; i += 3) {
            if (ingredientGroups[i + 1] && ingredientGroups[i + 2]) {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} />
                        <Product key={ingredientGroups[i + 1].id} product={ingredientGroups[i + 1]} />
                        <Product key={ingredientGroups[i + 2].id} product={ingredientGroups[i + 2]} />
                    </Grid>
                );
            } else if (ingredientGroups[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} />
                        <Product key={ingredientGroups[i + 1].id} product={ingredientGroups[i + 1]} />
                        <Col key={i} />
                    </Grid>
                );
            }
            else {
                items.push(
                    <Grid key={i}>
                        <Product key={ingredientGroups[i].id} product={ingredientGroups[i]} />
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
    }
    ,
    viewingredients: {
        padding: 5,
    },
    viewfooterimg: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
};
