/**
* This is the category component used in the home page
**/


import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking, Image } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Item, Input, Button, Grid, Col, Row } from 'native-base';
import { Actions } from 'react-native-router-flux';

// Our custom files and classes import
import Text from './Text';

export default class CategoryBlock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hotdishes: [],
    };

  }


  render() {
    return (
      // <View style={{ flex: 1 }}>
      <View
        style={styles.submit}
        underlayColor='#fff'>
        <View style={{ flex: 1 }}>
          <Image style={styles.image} source={require('../images/rp_Chicken_and_Rice_Stir-Fry_with_Vegetables.jpg')} />
        </View>
        <View style={{ flex: 1, shadowColor: 'black', shadowOpacity: 1.0, shadowOffset: { width: 10, height: 10, }, flexDirection: 'row', zIndex: 1, marginTop: -22, borderTopLeftRadius: 20, borderTopRightRadius: 20, width: '100%', backgroundColor: '#fdfdfd', paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12 }}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 30 }} >
              <Grid>
                <Col size={4}>
                  <Text style={{ marginLeft: 10, fontSize: 16, color: '#ff9500' }}>
                    King Prawn fried rice
               </Text>
                </Col>
                <Col>
                  <Text style={{ fontSize: 14 }}>
                    $5.99
               </Text>
                </Col>
              </Grid>
            </View>
            <View style={{ height: 115, width: '100%', marginRight: 80, marginTop: 5 }}>
              <Grid style={{ width: '100%' }}>
                <Row >
                  <Col style={{ width: '25%' }}>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/Bowl-of-rice.jpg')} />
                    </Col>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/fresh-spring-onions-8-stems.jpg')} />
                    </Col>
                  </Col>
                  <Col style={{ width: '25%' }}>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/poultry-kadaknath-egg-500x500.jpg')} />
                    </Col>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/large-whole-prawns.jpg')} />
                    </Col>
                  </Col>
                  <Col style={{ width: '25%' }}>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/chilli-1-136240.png')} />
                    </Col>
                    <Col style={{ padding: 12 }}>
                      <Image style={styles.imageind} source={require('../images/Bowl-of-rice.jpg')} />
                    </Col>
                  </Col>
                  <Col style={{ paddingLeft: 2, paddingTop: 5 }}>
                    <Image source={require('../images/QRcode.jpg')} />
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={{ height: 49, marginLeft: -11.5, marginRight: -11.5, padding: 10, backgroundColor: '#ddd', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
              <Grid style={{ width: '100%' }}>
                <Row >
                  <Col >
                    <Image style={styles.imagefooter} source={require('../images/share.png')} >
                    </Image>
                  </Col>
                  <Col >
                    <Image style={styles.imagefooter} source={require('../images/002-like.png')} />
                  </Col>
                  <Col >
                    <Image style={styles.imagefooter} source={require('../images/004-chat.png')} />
                  </Col>
                </Row>
              </Grid>
            </View>
          </View>
        </View>
      </View >
    );
  }

  _onPress() {
    Actions.category({ id: this.props.id, title: this.props.title });
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
  }
};
