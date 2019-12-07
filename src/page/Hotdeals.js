/**
* This is the Home page
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Content, View, Button, Left, Right, Icon, Card, CardItem, cardBody, Grid, Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

// Our custom files and classes import
import Text from '../component/Text';
import Navbar from '../component/Navbar';
import SideMenu from '../component/SideMenu';
import SideMenuDrawer from '../component/SideMenuDrawer';
import CategoryBlock from '../component/CategoryBlock';


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotdishes: [],
    };
    this.getalldishes = this.getalldishes.bind(this);
    this._retrieveData();

    //this.getalldishes()
    // this.state.hotdishes = [
    //   {
    //     id: 1,
    //     title: 'MEN',
    //     image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_489/v1500284127/pexels-photo-497848_yenhuf.jpg'
    //   },
    //   {
    //     id: 2,
    //     title: 'WOMEN',
    //     image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_460/v1500284237/pexels-photo-324030_wakzz4.jpg'
    //   },
    //   {
    //     id: 3,
    //     title: 'KIDS',
    //     image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_445/v1500284286/child-childrens-baby-children-s_shcevh.jpg'
    //   },
    //   {
    //     id: 4,
    //     title: 'ACCESORIES',
    //     image: 'http://res.cloudinary.com/atf19/image/upload/c_scale,w_467/v1500284346/pexels-photo-293229_qxnjtd.jpg'
    //   }
    // ];
    // setTimeout(() => {
    //   AsyncStorage.setItem("INGREDIENT", null);
    // }, 1000);
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


  componentDidMount() {

    this.getalldishes()

  }

  getalldishes() {
    var headers = new Headers();
    headers.append('Accept', 'application/json');

    fetch("http://dev-fs.8d.ie/api/order/order_dish", {
      method: "GET",
      // headers: headers,
      // body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //alert((responseJson.status));
        if (responseJson.status == "success") {
          this.setState({
            hotdishes: responseJson.data,
          });
        } else {
          this.setState({
            hotdishes: [],
          });
        }
      }).catch((error) => {
        console.error(error);
      });

  }

  render() {
    var left = (
      <Left style={{ flex: 1 }}>
        <Button style={{ flex: 1, marginBottom: 10 }} onPress={() => this._sideMenuDrawer.open()} transparent>
          <Icon name='ios-menu' />
        </Button>
      </Left>
    );
    var right = (
      <Right style={{ flex: 1, marginBottom: 10 }}>
        <Button onPress={() => Actions.search()} transparent>
          <Icon name='ios-search' />
        </Button>
        <Button onPress={() => Actions.vender()} transparent>
          <FontAwesomeIcon icon={faUserCircle} style={{ color: 'white' }} />
        </Button>
      </Right>
    );
    return (

      <SideMenuDrawer ref={(ref) => this._sideMenuDrawer = ref}>
        <Container style={{ backgroundColor: '#ebeff0', position: 'relative' }}>
          <Navbar left={left} right={right} height={100} title="Hot Deals" fontSize={20} marginBottom={15} marginLeft={20} />

          {this.state.hotdishes.length <= 0 ?
            // <Content style={{ zIndex: 1, width: '100%', height: '100%', backgroundColor: '#ebeff0', marginTop: -15, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <View style={{ zIndex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: -14, backgroundColor: '#ebeff0', flex: 1, justifyContent: 'center', alignItems: 'center', top: 0 }}>
              <Image
                style={{ alignItems: 'center', justifyContent: 'center', width: 35, height: 35 }} // must be passed from the parent, the number may vary depending upon your screen size
                source={require('../images/dish-create-black.png')}
              >
              </Image>
              <Text style={{ color: '#95a5a6' }}>No dishes available !</Text>
            </View>
            // </Content>
            :
            <Content style={{ zIndex: 1, backgroundColor: '#ebeff0', marginTop: -15, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
              {this.renderCategories()}
            </Content>
          }
        </Container>
      </SideMenuDrawer>
    );
  }

  renderCategories() {
    let cat = [];
    for (var i = 0; i < this.state.hotdishes.length; i++) {
      // alert(this.state.hotdishes[i].id)
      cat.push(
        <View
          style={styles.submit}
          underlayColor='#fff'>
          <View style={{ flex: 1 }}>
            {this.state.hotdishes[i].cover == ""
              ?
              <Image style={styles.image} source={require('../images/b1.jpg')} />
              :
              <Image style={styles.image} source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.hotdishes[i].cover }} />
            }
          </View>
          <View style={{ flex: 1, shadowColor: 'black', shadowOpacity: 1.0, shadowOffset: { width: 10, height: 10, }, flexDirection: 'row', zIndex: 1, marginTop: -22, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12 }}>
            <View style={{ flex: 1 }}>
              <View style={{ height: 30 }} >
                <Grid>
                  <Col size={4}>
                    <Text style={{ marginLeft: 10, fontSize: 16, color: '#ff9500' }}>
                      {this.state.hotdishes[i].dish_name}
                    </Text>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: 14 }}>
                      $ {this.state.hotdishes[i].rate}
                    </Text>
                  </Col>
                </Grid>
              </View>
              <View style={{ height: 115, width: '100%', marginRight: 80, marginTop: 5 }}>
                <Grid style={{ width: '100%' }}>
                  <Row>
                    {this.renderingredient(this.state.hotdishes[i].ingredient)}
                    <Col style={{ paddingLeft: 2, paddingTop: 5 }} onPress={() => this.openGallery()}>
                      <Image source={require('../images/QRcode.jpg')} />
                    </Col>
                  </Row>
                </Grid>
              </View>
              <View style={{ height: 49, marginLeft: -12, marginRight: -12, padding: 10, backgroundColor: '#ddd', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                <Grid style={{ width: '100%' }}>
                  <Row >
                    <Col >
                      <Image style={styles.imagefooter} source={require('../images/003-share_2.png')} >
                      </Image>
                    </Col>
                    <Col >
                      <Text style={styles.footertext}>{this.state.hotdishes[i].share}</Text>
                    </Col>
                    <Col >
                      <Image style={styles.imagefooter} source={require('../images/002-like.png')} />
                    </Col>
                    <Col >
                      <Text style={styles.footertext}>{this.state.hotdishes[i].like}</Text>
                    </Col>
                    <Col >
                      <Image style={styles.imagefooter} source={require('../images/004-chat.png')} />
                    </Col>
                    <Col >
                      <Text style={styles.footertext}>{this.state.hotdishes[i].comment}</Text>
                    </Col>
                  </Row>
                </Grid>
              </View>
            </View>
          </View>
        </View >
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
    height: 375,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    flex: 1,
    marginTop: -20
  },
  imageind: {
    borderRadius: 10,
    width: '100%',
    flex: 1,
    marginTop: -20
  }
  ,
  imageqr: {
    width: '80%',
    flex: 1,
  }
  ,
  imagefooter: {
    width: '25%',
    flex: 1,
    marginTop: 1,
    marginLeft: 20,
    padding: 15
  }
  ,
  navBar: {
    flexDirection: 'row',
  },
  footertext: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    padding: 5
  }
}
