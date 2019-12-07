/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, List, ListItem, Thumbnail, Input } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import RadioGroup from 'react-native-radio-button-group';
import { ToggleSwitchGroup } from 'toggle-switch-group'

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';
var totalprice = 0;

var radiogroup_options = [
    { id: 0, label: 'sit and eat' },
    { id: 1, label: 'collect from store' },
    { id: 2, label: 'delivery to address' },
];
export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: '',
            customer_id: null,
            total: this.props.total,
            iscollect: true,
            address: ''
        };

        AsyncStorage.getItem('visited_onces', (err, res) => {

            if (res === null || res === 'null' || res === "") {
                this.props.navigation.replace('login');
            } else {
                var user = JSON.parse(res)
                // this.setState({ total: props.navigation.state.params.total });
                this.setState({ customer_id: user.id })
                this.calluserinfo();
            }
        });

    }

    calluserinfo = async () => {

        var data = new FormData()
        data.append('id', this.state.customer_id);

        var headers = new Headers();
        headers.append('Accept', 'application/json');

        fetch("http://dev-fs.8d.ie/api/userInfo", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ address: responseJson[0].address });
            });
    }

    render() {
        var left = (
            <Left style={{ left: 10, flex: 1, marginBottom: 5 }}>
                <Button onPress={() => Actions.dishlist()} transparent>
                    <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                </Button>
            </Left>
        );
        var right = (
            <Right style={{ flex: 1, marginBottom: 5, right: 0 }}>
                <Button onPress={() => Actions.dishcreate()} transparent>
                    <Text style={{ color: 'white', fontSize: 18 }}> Close </Text>
                </Button>
            </Right>
        );
        return (
            <Container style={{ backgroundColor: '#ebeff0', position: 'relative' }}>
                <Navbar left={left} title="Checkout" marginLeft={15} fontSize={20} height={90} />
                <Content style={{ backgroundColor: 'white' }}>
                    <View style={{ flex: 1, width: '100%', height: 100, borderBottomWidth: 1, borderColor: '#ccccde', backgroundColor: '#efeff4', alignItems: 'center', justifyContent: 'center' }}>
                        <Row >
                            <Col style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ right: 0 }} // must be passed from the parent, the number may vary depending upon your screen size
                                    source={require('../images/card.png')}
                                >
                                </Image>
                            </Col>
                            <Col style={{ justifyContent: 'center', alignItems: 'center', left: -40 }}>
                                <Text onPress={() => this.gotocheckout()} style={{ color: 'black', textAlign: 'center', width: '100%', fontSize: 55 }} >$ <Text style={{ color: 'black', textAlign: 'center', width: '100%', fontSize: 40, justifyContent: 'center', alignItems: 'center', }}>{this.state.total}</Text></Text>
                            </Col>
                        </Row>
                    </View>

                    <View style={{ flex: 1, width: '100%', height: 140, borderColor: '#ccccde', borderBottomWidth: 1, flex: 1, backgroundColor: '#efeff4', alignItems: 'center', justifyContent: 'center' }}>
                        <Row >
                            <Col style={{ width: '70%', alignItems: 'center', justifyContent: 'center' }}>

                                {this.state.iscollect ?
                                    <View>
                                        <Text>Collect from store at</Text>
                                        <Text>{new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes()}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text>Delivery Address</Text>
                                        <Text>{this.state.address}</Text>
                                    </View>
                                }
                            </Col>
                            <Col style={{ width: '30%', justifyContent: 'center', alignItems: 'center', left: -40 }}>
                                <Text>Change</Text>
                            </Col>
                        </Row>
                    </View>

                    <View style={{ flex: 1, width: '100%', height: 140, backgroundColor: '#efeff4', alignItems: 'center', justifyContent: 'center' }}>
                        <RadioGroup
                            options={radiogroup_options}
                            circleStyle={{ backgroundColor: 'white', left: -40, fillColor: Colors.navbarBackgroundColor, borderColor: '#ccccde' }}
                            onChange={(option) => this.setState({ iscollect: !this.state.iscollect })}
                            activeButtonId={1}
                        />
                    </View>

                    <View style={{ flex: 1, height: 160, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Item style={{ background: "transparent", width: '90%' }}>
                            <Input onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="black" placeholder="Card Number" />
                        </Item>
                        <Item style={{ background: "transparent", width: '90%' }}>
                            <Input onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="black" placeholder="Card Holder" />
                        </Item>
                        <Row >
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Item style={{ background: "transparent", width: '60%' }}>
                                    <Input onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="black" placeholder="Expiry Date" keyboardType="number-pad" />
                                </Item>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Item style={{ background: "transparent", width: '60%' }}>
                                    <Input onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="black" placeholder="CVV" keyboardType="number-pad" />
                                </Item>
                            </Col>
                        </Row>
                        {/* <Item style={{ background: "transparent", width: '90%' }}>
                            <Input onChangeText={(text) => this.setState({ email: text })} placeholderTextColor="black" placeholder="Card Holder" />
                        </Item> */}
                    </View>
                </Content>
                <Footer style={{ backgroundColor: Colors.navbarBackgroundColor }} backgroundColor={Colors.navbarBackgroundColor} >
                    <Body >
                        <View style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20, justifyContent: 'center', alignItems: 'center', }} >
                            <Text onPress={() => Actions.dishcreate()} style={{ color: 'white', textAlign: 'center', width: '100%', fontSize: 20, justifyContent: 'center', alignItems: 'center', }} >Pay</Text>
                        </View>
                    </Body>
                </Footer>
            </Container>
        )
    }


    // renderItems() {
    //     let items = [];
    //     this.state.basketItems.map((item, i) => {
    //         items.push(
    //             <Item
    //                 key={i}
    //                 noBorder
    //                 last={this.state.basketItems.length === i + 1}
    //                 style={{ width: '100%' }}
    //             >
    //                 {/* <View style={styles.submit}> */}
    //                 <Card style={{ width: '97%' }}>
    //                     <CardItem style={{ width: '100%', marginRight: -10 }}>
    //                         <Thumbnail square style={{ width: '35%', height: '127%', marginLeft: -17 }} source={require('../images/dish-create-black.png')} />
    //                         <Body style={{ paddingLeft: 10 }}>
    //                             <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
    //                                 {item.name}
    //                             </Text>
    //                             <View>
    //                                 <Text style={{ fontSize: 16 }}>
    //                                     {this.getingredients(item).ingredient}
    //                                 </Text>
    //                             </View>

    //                             <Grid>
    //                                 <Col size={4}>
    //                                     <View style={{ flex: 1, flexDirection: 'row' }}>
    //                                         <Button block icon transparent onPress={() => this.quantityupdate(item, parseInt(item.cart_quantity) - 1)} >
    //                                             <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
    //                                         </Button>
    //                                         <View style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}>
    //                                             <Text style={{ fontSize: 14, marginLeft: 10 }}>{item.cart_quantity}</Text>
    //                                         </View>
    //                                         <Button block icon transparent onPress={() => this.quantityupdate(item, parseInt(item.cart_quantity) + 1)}>
    //                                             <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
    //                                         </Button>
    //                                         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                                             <Text style={{ fontSize: 18, marginLeft: 20 }}>$   {this.getingredients(item).price}</Text>
    //                                         </View>
    //                                     </View>
    //                                 </Col>
    //                             </Grid>
    //                         </Body>
    //                         <Right style={{ top: -40 }}>
    //                             <Button transparent onPress={() => this.removeItemPressed(item)}>
    //                                 <FontAwesomeIcon icon={faTimes} size={20} style={{ color: '#ff9500' }} />
    //                             </Button>
    //                         </Right>
    //                     </CardItem>
    //                 </Card>
    //                 {/* </View> */}
    //             </Item>
    //         );
    //     });
    //     return items;
    // }

    // getingredients(item) {
    //     let items = {};
    //     let ingredient = null
    //     let price = 0;
    //     let totalprice = 0;
    //     item.ingredients.map((item, i) => {
    //         if (ingredient == null) {
    //             ingredient = "." + item.name
    //         } else {
    //             ingredient = ingredient + "." + item.name
    //         }
    //         price = price + item.price
    //     })
    //     price = price * item.cart_quantity;
    //     items["ingredient"] = ingredient;
    //     items["price"] = parseFloat(price);
    //     totalprice = totalprice + parseFloat(price);
    //     //items.push({ ingredient: ingredient, price: parseFloat(price) })
    //     return items
    // }


    // quantityupdate(item, cart_quantity) {
    //     item.cart_quantity = cart_quantity < 1 ? (cart_quantity = 1) : cart_quantity
    //     // call update cart api
    //     let items = [];
    //     this.state.basketItems.map((item) => {
    //         items.push(item);
    //     });
    //     this.setState({ basketItems: items });
    // }


    // gettotalamount() {
    //     let total = 0;
    //     this.state.basketItems.map((item, i) => {
    //         let price = 0;
    //         item.ingredients.map((items, i) => {
    //             price = price + parseFloat(items.price * item.cart_quantity)
    //         })
    //         total = total + price
    //     })
    //     return total
    // }

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

