/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, List, ListItem, Thumbnail } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-native-anchor-carousel';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';

const dataImage = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
    { backgroundColor: 'blue' },
    { backgroundColor: 'yellow' }
];

export default class FavouriteDish extends Component {
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
    }

    componentWillMount() {
        this.setState({ product: dummyProduct });

        const product = [];
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

        const dummyProduct123 = {
            id: 3,
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

        product.push(dummyProduct)
        product.push(dummyProduct123)



        this.state = {
            cartItems: product
                .map((_, i) => ({ key: `${i}`, text: _.title, image: _.image })),
        };
        // this.state.cartItems.push(dummyProduct)
        // this.state.cartItems.push(dummyProduct)
        // this.state.cartItems.push(dummyProduct)
        // this.state.cartItems.push(dummyProduct)
        // this.state.cartItems.push(dummyProduct)
        // this.state.cartItems.push(dummyProduct)
        //this.setState({ cartItems: dummyProduct })
    }

    closeRow(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
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
                <Navbar right={right} title="Favourite" marginLeft={25} fontSize={20} height={90} />
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
                        <View style={{ flex: 1, width: '100%', }}>
                            {this.renderItems()}
                        </View>
                    </Content>

                }
            </Container>
        )
    }


    renderItems() {
        return <SwipeListView
            data={this.state.cartItems}
            renderItem={this.renderItemList}
            renderHiddenItem={(data, rowMap) => (
                <View style={styles.rowBack}>
                    <TouchableOpacity
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnLeft,
                        ]}
                    >
                        <View>
                            <Image style={{ width: 50, height: 50 }} source={require('../images/003-share.png')} >
                            </Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                        ]}
                    // onPress={() =>
                    //     this.closeRow(rowMap, data.item.id)
                    // }
                    >
                        <View>
                            <Image style={{ width: 50, height: 50 }} source={require('../images/garbage1.png')} >
                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
        />
    }

    renderItemList = ({ item, index }) => {
        const { backgroundColor } = item;
        return (
            <TouchableHighlight
                onPress={() => console.log('You touched me')}
                // style={styles.rowFront}
                underlayColor={'#AAA'}
            >
                <Card>
                    <Row style={{ backgroundColor: 'white', height: 80, width: '100%' }}>
                        <Col style={{ width: '20%' }}>
                            <View style={{ marginLeft: 0 }}>
                                <Image style={{ width: 80, height: 80 }} source={{ uri: item.image }}>
                                </Image>
                            </View>
                        </Col>
                        <Col style={{ width: '80%', marginLeft: 0 }}>
                            <View  >
                                <Text style={{ padding: 8, marginLeft: 8 }}>
                                    I am {item.title} in a SwipeListView
                                     </Text>
                            </View>
                        </Col>
                    </Row>
                </Card>
            </TouchableHighlight>
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
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        // bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        // top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        // backgroundColor: 'transparent',
        right: 75,
    },
    backRightBtnRight: {
        // backgroundColor: 'red',
        right: 0,
    },
    controls: {
        alignItems: 'center',
        marginBottom: 30,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5,
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        // width: Dimensions.get('window').width / 4,
    },
    trash: {
        height: 25,
        width: 25,
    },
}

