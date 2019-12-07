/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faChevronLeft, faQrcode } from '@fortawesome/free-solid-svg-icons'

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';


export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            items: [],
            uri: null,
            id: null,
            email: null,
            name: null,
            access_token: null,
            stateItems: []
        };

        // this.state.stateItems = [
        //     { id: 1, title: 'Black Hat', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 2, title: 'V Neck T-Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 10, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 15, title: 'Long Sleeves T-Shirt', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_100,y_50/v1500465308/pexels-photo-500034_uvxwcq.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 11, title: 'Pink Diamond Watch', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 22, title: 'Golden Tie', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 100, title: 'Black Pearl Earrings', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_center,h_250/v1500465307/pexels-photo-262226_kbjbl3.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 215, title: 'Grey Blazer', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 12, title: 'Mirror Sunglasses', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250/v1500465307/pexels-photo-488541_s0si3h.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 29, title: 'White Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        //     { id: 16, title: 'Tie', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        // ];

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
                this.setState({ uri: userdata.avatar });
            }
        });
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#ebeff0', paddingTop: 25, position: 'relative' }}>
                <Header style={{ backgroundColor: Colors.navbarBackgroundColor, height: 160 }} backgroundColor={Colors.navbarBackgroundColor} androidStatusBarColor={Colors.statusBarColor} hasSegment>
                    <Left style={{ paddingBottom: 100, left: 0 }} >
                        <Button transparent onPress={() => Actions.hotdeals()}>
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
                                        : <Image style={{ width: 95, height: 95, borderRadius: 200 / 2 }} source={{ uri: "http://dev-fs.8d.ie/img/" + this.state.uri }}  >
                                        </Image>
                                    }
                                </View>
                                <Text style={{ color: 'white', fontStyle: 'bolder', paddingLeft: 10, justifyContent: 'center', alignItems: 'center', }}>{this.state.name ? this.state.name : this.state.email}</Text>
                            </Col>
                            <Col style={{ zIndex: 3, position: 'absolute', alignItems: 'center', justifyContent: 'center', width: '10%', height: '50%', marginTop: 40, right: 60 }}>
                                <Button transparent onPress={() => Actions.editprofile()}>
                                    <FontAwesomeIcon icon={faEdit} style={{ color: 'white' }} size={25} />
                                </Button>
                            </Col>
                            <Col style={{ alignItems: 'center', justifyContent: 'center', width: '20%' }}>
                                <Button transparent >
                                    <FontAwesomeIcon icon={faQrcode} style={{ color: 'white', paddingLeft: 20 }} size={35} />
                                </Button>
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
                {this.state.stateItems.length <= 0 ?
                    // <Content style={{ zIndex: 1, width: '100%', height: '100%', backgroundColor: '#ebeff0', marginTop: -15, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ zIndex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#ebeff0', flex: 1, justifyContent: 'center', alignItems: 'center', top: 0 }}>
                        <Image
                            style={{ alignItems: 'center', justifyContent: 'center', width: 35, height: 35 }} // must be passed from the parent, the number may vary depending upon your screen size
                            source={require('../images/dish-create-black.png')}
                        >
                        </Image>
                        <Text style={{ color: '#95a5a6' }}>No order available !</Text>
                    </View>
                    // </Content>
                    :
                    <Content style={{ zIndex: 1, backgroundColor: '#ebeff0', marginTop: -15, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                        {this.renderResult()}
                    </Content>
                }
            </Container>
        );
    }

    renderResult() {
        let items = [];
        // let stateItems = this.state.items
        // alert(stateItems.length)
        for (var i = 0; i < this.state.stateItems.length; i += 2) {
            if (this.state.stateItems[i + 1]) {
                items.push(
                    <Grid key={i}>
                        <Product key={this.state.stateItems[i].id} product={this.state.stateItems[i]} />
                        <Product key={this.state.stateItems[i].id} product={this.state.stateItems[i]} />
                        <Product key={this.state.stateItems[i + 1].id} product={this.state.stateItems[i + 1]} />
                    </Grid>
                );
            }
            else {
                items.push(
                    <Grid key={i}>
                        <Product key={this.state.stateItems[i].id} product={this.state.stateItems[i]} />
                        <Col key={i + 1} />
                        <Col key={i + 1} />
                    </Grid>
                );
            }
        }
        return items;
    }


    search(text) {
        var searchResult = [
            { id: 1, title: 'Black Hat', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,w_358,x_150/v1500465309/pexels-photo-206470_nwtgor.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 2, title: 'V Neck T-Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_226,y_54/v1500465309/pexels-photo-521197_hg8kak.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 10, title: 'Black Leather Hat', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250,x_248/v1500465308/fashion-men-s-individuality-black-and-white-157675_wnctss.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 15, title: 'Long Sleeves T-Shirt', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250,x_100,y_50/v1500465308/pexels-photo-500034_uvxwcq.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 11, title: 'Pink Diamond Watch', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,h_250/v1500465308/pexels-photo-179909_ddlsmt.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 22, title: 'Golden Tie', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 100, title: 'Black Pearl Earrings', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_center,h_250/v1500465307/pexels-photo-262226_kbjbl3.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 215, title: 'Grey Blazer', categoryId: 5, categoryTitle: 'MEN', price: '120$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 12, title: 'Mirror Sunglasses', categoryId: 5, categoryTitle: 'MEN', price: '22$', image: 'http://res.cloudinary.com/atf19/image/upload/c_crop,g_face,h_250/v1500465307/pexels-photo-488541_s0si3h.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 29, title: 'White Shirt', categoryId: 2, categoryTitle: 'WOMEN', price: '12$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
            { id: 16, title: 'Tie', categoryId: 1, categoryTitle: 'KIDS', price: '2$', image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_300/v1500284127/pexels-photo-497848_yenhuf.jpg', description: "Hello there, i'm a cool product with a heart of gold." },
        ];
        this.setState({ items: searchResult });
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
        marginTop: 10
    }
};