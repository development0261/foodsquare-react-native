/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-native-anchor-carousel';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';

const data = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' }
];

export default class DishShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: [],
            product: {},
            activeSlide: 0,
            quantity: 1,
            selectedColor: '',
            selectedSize: ''
        };
        this.state.cartItems.push()
    }

    componentWillMount() {
        this.setState({ product: dummyProduct });

        const dummyProduct = {
            id: 2,
            title: 'V NECK T-SHIRT',
            description: "Pellentesque orci lectus, bibendum iaculis aliquet id, ullamcorper nec ipsum. In laoreet ligula vitae tristique viverra. Suspendisse augue nunc, laoreet in arcu ut, vulputate malesuada justo. Donec porttitor elit justo, sed lobortis nulla interdum et. Sed lobortis sapien ut augue condimentum, eget ullamcorper nibh lobortis. Cras ut bibendum libero. Quisque in nisl nisl. Mauris vestibulum leo nec pellentesque sollicitudin. Pellentesque lacus eros, venenatis in iaculis nec, luctus at eros. Phasellus id gravida magna. Maecenas fringilla auctor diam consectetur placerat. Suspendisse non convallis ligula. Aenean sagittis eu erat quis efficitur. Maecenas volutpat erat ac varius bibendum. Ut tincidunt, sem id tristique commodo, nunc diam suscipit lectus, vel",
            image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
            images: [
                'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg',
                'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg',
                'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg',
                'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg'
            ],
            price: '120$',
            colors: ['Red', 'Blue', 'Black'],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            category: 'MAN',
            similarItems: [
                { id: 10, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg' },
                { id: 11, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' },
                { id: 12, title: 'V NECK T-SHIRT', price: '29$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg' }
            ]
        };

        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        this.state.cartItems.push(dummyProduct)
        //this.setState({ cartItems: dummyProduct })
    }



    render() {
        var right = (
            <Right style={{ flex: 1, marginBottom: 5, right: 0 }}>
                <Button onPress={() => Actions.hotdeals()} transparent>
                    <Text style={{ color: 'white', fontSize: 18 }}> Close </Text>
                </Button>
            </Right>
        );
        return (
            <Container style={{ backgroundColor: '#ebeff0', position: 'relative' }}>
                <Navbar right={right} title="Share" marginLeft={25} fontSize={22} height={90} />
                {this.state.cartItems.length <= 0 ?
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
            </Container>
        )
    }


    renderItems() {
        let items = [];
        this.state.cartItems.map((item, i) => {
            items.push(
                <ListItem
                    last={this.state.cartItems.length === i + 1}
                    noBorder
                    key={item.id}
                    button={true}
                    style={{ left: 0 }}
                >
                    {/* <Card > */}
                    <Row style={{ backgroundColor: 'white', height: 100, width: '105%' }}>
                        <Col style={{ width: '16.5%' }}>
                            <View style={styles.MainContainer} >
                                <Image style={{ width: 80, height: 100, marginLeft: -12 }} source={{ uri: item.image }}>
                                </Image>
                            </View>
                        </Col>
                        <Col style={{ width: '17%', marginLeft: 20 }}>
                            <View style={styles.MainContainer} >
                                <Image style={{ width: 70, height: 70, borderRadius: 200 / 2 }} source={require('../images/rp_Chicken_and_Rice_Stir-Fry_with_Vegetables.jpg')} >
                                </Image>
                            </View>
                        </Col>
                        <Col style={{ width: '17%', marginLeft: 20 }}>
                            <View style={styles.MainContainer} >
                                <Image style={{ width: 50, height: 50 }} source={require('../images/share.png')} >
                                </Image>
                            </View>
                        </Col>
                        <Col style={{ flex: 1, width: '49%', marginLeft: -10 }}>
                            <View style={styles.MainContainer} >
                                <Carousel
                                    style={styles.carousel}
                                    data={data}
                                    renderItem={this.renderItemImage}
                                    inActiveOpacity={0.4}
                                    itemWidth={99}
                                    itemHeight={99}
                                    containerWidth={125}
                                    separatorWidth={-60}
                                    ref={(c) => {
                                        this.numberCarousel = c;
                                    }}
                                />
                            </View>
                        </Col>
                    </Row>
                    {/* </Card> */}
                </ListItem>
            );
        });
        return items;
    }

    renderItemImage = ({ item, index }) => {
        const { backgroundColor } = item;
        return (
            <TouchableOpacity
                style={[styles.item]}
                onPress={() => {
                    this.numberCarousel.scrollToIndex(index);
                }}
            >
                <Image
                    source={require('../images/rp_Chicken_and_Rice_Stir-Fry_with_Vegetables.jpg')}
                    style={{ width: 60, height: 60, borderRadius: 200 / 2 }}
                >
                </Image>
            </TouchableOpacity>
        );
    };

}

const styles = {
    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carousel: {
        flex: 1,
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 100,
        fontWeight: 'bold'
    },
}

