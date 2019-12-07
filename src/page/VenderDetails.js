/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image, ImageBackground, FlatList } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Header, Segment, Body, Title, Item, Grid, Col, Row, Footer, ListView } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft, faCamera, faMapMarkerAlt, faPhoneAlt, faEnvelope, faClock, faQrcode } from '@fortawesome/free-solid-svg-icons'
import MapView from 'react-native-maps';

// Our custom files and classes import
import Text from '../component/Text';
import Colors from '../Colors';
import Product from '../component/Product';
import Navbar from '../component/Navbar';

const stateItems = [
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

export default class VenderDetails extends Component {

    map = null;

    constructor(props) {
        super(props);
        this.state = {
            latitude: 40.3565,
            longitude: 27.9774,
            storename: "",
            marker: {
                coord: {
                    latitude: 48.85837009999999,//responseJson["data"][0].lat,
                    longitude: 2.2944813000000295,//responseJson["data"][0].long,
                }
            },
            commentscount: 0,
            postalcode: null,
            phone: null,
            close: null,
            email: null,
            dish: [],
            comment: [],
            data: stateItems
        };

    }

    componentDidMount = () => {
        this.onRegionChange();
    }

    onRegionChange() {
        //alert("calll")
        var data = new FormData()
        data.append('id', 1);

        var headers = new Headers();
        headers.append('Accept', 'application/json');
        return fetch("http://dev-fs.8d.ie/api/vender/venders-detail", {
            method: "POST",
            headers: headers,
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["status"] == "success") {
                    this.setState({ storename: responseJson["data"][0].name });
                    this.setState({ latitude: parseFloat(responseJson["data"][0].lat) });
                    this.setState({ longitude: parseFloat(responseJson["data"][0].long) });
                    this.setState({ postalcode: responseJson["data"][0].postcode })
                    this.setState({ phone: responseJson["data"][0].phone })
                    this.setState({ close: responseJson["data"][0].close })
                    // this.setState({ email: responseJson["data"][0].comment.length })

                    var marker = {
                        coord: {
                            latitude: parseFloat(responseJson["data"][0].lat),//responseJson["data"][0].lat,
                            longitude: parseFloat(responseJson["data"][0].long),//responseJson["data"][0].long,
                        }
                    }
                    this.setState({ dish: responseJson["data"][0].dish })
                    this.setState({ comment: responseJson["data"][0].comment })
                    this.setState({ marker: marker });
                    this.setState({ commentscount: responseJson["data"][0].comment.length })
                }
            })
    };


    _renderEmail = (email) => {
        if (email != null) {
            return (
                <Row style={styles.rowsinfo}>
                    <Col style={styles.rattingfont}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ color: '#646460' }} />
                    </Col>
                    <Col style={styles.rattingtext}>
                        <Text style={{ color: '#646460' }} > {this.state.email} </Text>
                    </Col>
                </Row>
            );
        } else {
            return null;
        }
    }

    govender() {
        alert("calll")
    }

    render() {
        return (
            <Container style={{ backgroundColor: '#efeff4' }}>
                <Header
                    style={{ zIndex: 4, opacity: 0.8, position: 'relative' }}
                    backgroundColor='#ebb76e'
                    // androidStatusBarColor={Colors.statusBarColor}
                    noShadow={true}
                    transparent

                >
                    <Left>
                        <Button style={{ flex: 1 }} onPress={() => Actions.vender()} transparent>
                            <FontAwesomeIcon icon={faChevronLeft} size={25} style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Body >
                        <Grid style={{ width: '100%' }}>
                            <Col style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                                <Title style={styles.title}>{this.state.storename} </Title>
                            </Col>
                            <Col style={{ width: '20%', justifyContent: 'center', alignItems: 'center', marginLeft: 30 }}>
                                <FontAwesomeIcon icon={faQrcode} size={25} style={{ color: 'white' }} />
                            </Col>
                        </Grid>
                    </Body>
                </Header>
                <Content style={{ zIndex: -4, position: 'absolute' }}>
                    <View style={styles.view}>
                        <MapView
                            ref={map => { this.map = map }}
                            region={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.015,
                            }}
                            style={{ zIndex: -4, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(52, 52, 52)', }}
                        >
                            <MapView.Marker
                                title={this.state.storename}
                                description={this.state.storename}
                                coordinate={this.state.marker.coord}
                            />
                        </MapView>
                    </View>
                    <View style={styles.MainContainer}>
                        <FontAwesomeIcon icon={faCamera} style={{ color: '#413d3d' }} size={25} onPress={() => this.opencamera()} />
                    </View>
                    <View style={styles.viewcontent}>
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
                        </Grid>
                    </View>
                    <View style={styles.viewinfo}>
                        <Grid style={styles.gridinfo}>
                            <Row style={styles.rowsinfo}>
                                <Col style={styles.rattingfont}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#646460' }} />
                                </Col>
                                <Col style={styles.rattingtext}>
                                    <Text style={{ color: '#646460' }} > {this.state.postalcode} </Text>
                                </Col>
                            </Row>
                            <Row style={styles.rowsinfo}>
                                <Col style={styles.rattingfont}>
                                    <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#646460' }} />
                                </Col>
                                <Col style={styles.rattingtext}>
                                    <Text style={{ color: '#646460' }} > {this.state.phone} </Text>
                                </Col>
                            </Row>
                            {this._renderEmail(this.state.email)}
                            <Row style={styles.rowsinfo, { marginBottom: 15 }}>
                                <Col style={styles.rattingfont}>
                                    <FontAwesomeIcon icon={faClock} style={{ color: '#646460' }} />
                                </Col>
                                <Col style={styles.rattingtext}>
                                    <Text style={{ color: '#646460' }} > Close at {this.state.close} Today </Text>
                                </Col>
                            </Row>
                        </Grid>
                        <FlatList
                            style={styles.flatlistinfo}
                            horizontal
                            data={this.state.dish}
                            renderItem={({ item: rowData }) => {
                                return (

                                    <Card transparent containerStyle={{ padding: 0, width: 160 }}>
                                        <Image source={{ uri: "http://dev-fs.8d.ie/storage/" + rowData.cover }} style={styles.image} />
                                        <Text>
                                            {/* {rowData.title} */}
                                        </Text>
                                    </Card>
                                );
                            }}
                            keyExtractor={(item, index) => index}
                        />
                    </View>
                    <View style={styles.viewinfo}>
                        {this.renderResult()}
                    </View>
                </Content>
            </Container >

        )
    }



    renderResult() {
        let items = [];
        // let stateItems = this.state.items
        // alert(stateItems.length)
        var stateItems = [
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
        for (var i = 0; i < this.state.comment.length; i++) {
            items.push(
                <Grid style={{ width: '100%' }} key={i}>
                    <Row style={styles.lastrows}>
                        <Col style={{ width: '25%', height: '80%' }}>
                            <Card transparent>
                                <CardItem cardBody>
                                    <View style={styles.MainContainerImage} >
                                        {this.state.uri == ""
                                            ?
                                            <Image source={require('../images/logonew.png')} style={{ width: 70, height: 70, borderRadius: 200 / 2, marginLeft: 0 }} />
                                            :
                                            <Image source={{ uri: "http://dev-fs.8d.ie/img/" + this.state.comment[i].customer_avatar }} style={{ width: 70, height: 70, borderRadius: 200 / 2, marginLeft: 0 }} />
                                        }

                                    </View>
                                </CardItem>
                            </Card>
                        </Col>
                        <Col style={{ width: '75%', height: '100%', paddingLeft: 10 }}>
                            <Text style={{ fontSize: 16 }}>
                                {this.state.comment[i].customer_name}
                            </Text>
                            <Text style={{ fontSize: 12 }}>
                                {this.state.comment[i].comment}
                            </Text>
                            {/* <FlatList
                                horizontal
                                data={this.state.data}
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <Card transparent>
                                            <Image source={{ uri: rowData.image }} style={styles.lastimage} />
                                            <Text >
                                            </Text>
                                        </Card>
                                    );
                                }}
                                keyExtractor={(item, index) => index}
                            /> */}
                        </Col>
                    </Row>

                </Grid>
            );
            // }
            // else {
            //     items.push(
            //         <Grid key={i}>
            //             <Product key={stateItems[i].id} product={stateItems[i]} />
            //         </Grid>
            //     );
            // }
        }
        return items;
    }



}


const styles = {
    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 200 / 2,
        height: 50,
        width: 50,
        backgroundColor: 'white',
        opacity: 0.7,
        position: 'absolute',
        padding: 20, marginTop: 225, marginLeft: 160,
    },
    MainContainerImage: {
        flex: 1,
        alignItems: 'center',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 10,
        marginLeft: 70
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '100',

    },
    view: {
        flex: 1,
        height: 250,
        backgroundColor: '#efeff4',
        width: '100%',
        padding: 0,
    },
    viewcontent: {
        flex: 1,
        height: 75,
        backgroundColor: '#efeff4',
        width: '100%',
        padding: 8,
        zIndex: -1
    },
    viewinfo: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',

    },
    rows: {
        height: '100%',
        backgroundColor: '#efeff4',
        paddingBottom: 0

    },
    rowsinfo: {
        height: '25%',
        backgroundColor: 'white',
        paddingBottom: 0,
    },
    gridinfo: {
        marginTop: 5,
        backgroundColor: 'white',
        border: 1,
        borderBottomWidth: 1,
        borderColor: '#ccccde',
        marginBottom: 5,
    },
    flatlistinfo: {
        marginTop: 10,
        backgroundColor: 'white',
        border: 1,
        borderBottomWidth: 1,
        borderColor: '#ccccde',
        // padding: 5,
    },
    ratting: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rattingfont: {
        width: '10%',
        marginLeft: 10
    },
    rattingtext: {
        width: '80%',
        color: '#646460'

    },
    col: {
        alignItems: 'center',
        justifyContent: 'center',
        border: 1,
        borderLeftWidth: 1,
        borderColor: '#ccccde'
    },
    rowicon: {
        marginTop: 10,
        padding: 8,
    }
    ,
    viewingredients: {
        padding: 5,
    },
    button: { flex: 1, height: 100, marginTop: 0 },
    image: { height: 100, width: 100, flex: 1 },
    lastrows: { border: 1, borderBottomWidth: 1, borderColor: '#ccccde', },
    lastimage: { height: 40, width: 40, flex: 1 }
};