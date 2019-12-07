/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';
var totalprice = 0;
export default class DishList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basketItems: [],
            product: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: '',
            customer_id: null
        };

        try {
            AsyncStorage.getItem('visited_onces', (err, res) => {

                if (res === null || res === 'null' || res === "") {
                    this.props.navigation.replace('login');
                } else {
                    var user = JSON.parse(res)
                    this.setState({ customer_id: user.id })
                    this._getcartitem();
                }
            });

        } catch (error) {
        }
    }



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

    render() {
        var right = (
            <Right style={{ flex: 1, marginBottom: 5, right: 0 }}>
                <Button onPress={() => Actions.dishcreate()} transparent>
                    <Text style={{ color: 'white', fontSize: 18 }}> Close </Text>
                </Button>
            </Right>
        );
        return (
            <Container style={{ backgroundColor: '#ebeff0', position: 'relative' }}>
                <Navbar right={right} title="Basket" marginLeft={25} fontSize={22} height={90} />
                {this.state.basketItems.length <= 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ alignItems: 'center', justifyContent: 'center', width: 35, height: 35 }} // must be passed from the parent, the number may vary depending upon your screen size
                            source={require('../images/dish-create-black.png')}
                        >
                        </Image>

                        <Text style={{ color: '#95a5a6' }}>Your Basket is empty</Text>
                    </View>
                    :
                    <Content style={{ backgroundColor: '#ebeff0' }}>
                        <View style={{ flex: 1, width: '100%' }}>
                            {this.renderItems()}
                        </View>
                    </Content>

                }
                <Footer style={{ backgroundColor: Colors.navbarBackgroundColor }} backgroundColor={Colors.navbarBackgroundColor} >
                    <Body >
                        <View style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20, justifyContent: 'center', alignItems: 'center', }} >
                            <Text onPress={() => this.gotocheckout()} style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20, justifyContent: 'center', alignItems: 'center', }} >Check Out $ <Text style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 15, justifyContent: 'center', alignItems: 'center', }}>{this.gettotalamount()}</Text></Text>
                        </View>
                    </Body>
                </Footer>
            </Container>
        )
    }


    gotocheckout() {
        Actions.checkout({ total: this.gettotalamount() });
        // setTimeout(() => {
        //     this.props.navigation.navigate('checkout', { total: this.gettotalamount() });
        // }, 1000);
    }

    renderItems() {
        let items = [];
        this.state.basketItems.map((item, i) => {
            items.push(
                <Item
                    key={i}
                    noBorder
                    last={this.state.basketItems.length === i + 1}
                    style={{ width: '100%' }}
                >
                    {/* <View style={styles.submit}> */}
                    <Card style={{ width: '97%' }}>
                        <CardItem style={{ width: '100%', marginRight: -10 }}>
                            <Thumbnail square style={{ width: '35%', height: '127%', marginLeft: -17 }} source={require('../images/dish-create-black.png')} />
                            <Body style={{ paddingLeft: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {item.name}
                                </Text>
                                <View>
                                    <Text style={{ fontSize: 16 }}>
                                        {this.getingredients(item).ingredient}
                                    </Text>
                                </View>

                                <Grid>
                                    <Col size={4}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Button block icon transparent onPress={() => this.quantityupdate(item, parseInt(item.cart_quantity) - 1)} >
                                                <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                                            </Button>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
                                                <Text style={{ fontSize: 14, marginLeft: 10 }}>{item.cart_quantity}</Text>
                                            </View>
                                            <Button block icon transparent onPress={() => this.quantityupdate(item, parseInt(item.cart_quantity) + 1)}>
                                                <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
                                            </Button>
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 18, marginLeft: 20 }}>$   {this.getingredients(item).price}</Text>
                                            </View>
                                        </View>
                                    </Col>
                                </Grid>
                            </Body>
                            <Right style={{ top: -40 }}>
                                <Button transparent onPress={() => this.removeItemPressed(item)}>
                                    <FontAwesomeIcon icon={faTimes} size={20} style={{ color: '#ff9500' }} />
                                </Button>
                            </Right>
                        </CardItem>
                    </Card>
                    {/* </View> */}
                </Item>
            );
        });
        return items;
    }

    getingredients(item) {
        let items = {};
        let ingredient = null
        let price = 0;
        let totalprice = 0;
        item.ingredients.map((item, i) => {
            if (ingredient == null) {
                ingredient = "." + item.name
            } else {
                ingredient = ingredient + "." + item.name
            }
            price = price + item.price
        })
        price = price * item.cart_quantity;
        items["ingredient"] = ingredient;
        items["price"] = parseFloat(price);
        totalprice = totalprice + parseFloat(price);
        //items.push({ ingredient: ingredient, price: parseFloat(price) })
        return items
    }


    quantityupdate(item, cart_quantity) {
        item.cart_quantity = cart_quantity < 1 ? (cart_quantity = 1) : cart_quantity
        // call update cart api
        let items = [];
        this.state.basketItems.map((item) => {
            items.push(item);
        });
        this.setState({ basketItems: items });
    }


    gettotalamount() {
        let total = 0;
        this.state.basketItems.map((item, i) => {
            let price = 0;
            item.ingredients.map((items, i) => {
                price = price + parseFloat(items.price * item.cart_quantity)
            })
            total = total + price
        })
        return total
    }

}



const styles = {
    submit: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
}

