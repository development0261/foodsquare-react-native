/**
* This is the Product component
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { Modal, Image, Alert } from 'react-native';
import { View, Col, Card, CardItem, Body, Button, Grid, Row, Icon, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-community/async-storage';

import Text from '../component/Text';
import Colors from '../Colors';


export default class product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
      dialogVisible: false,
      quantity: 1,
      cover: null,
      name: null,
      dish_id: null,
      max: null,
      description: null,
      ingredient_group_id: null,
      groupname: null,
      price: 0,
      total: 0,
      ingList: []
    };



  }

  // componentWillMount() {
  //   AsyncStorage.getItem("INGREDIENT", (err, res) => {
  //     if (!res) this.setState({ ingList: [] });
  //     else {
  //       this.setState({ ingList: JSON.parse(res) })
  //     }
  //   });
  // }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <Col>
        <Dialog.Container visible={this.state.dialogVisible} contentStyle={{ backgroundColor: '#efeff4', width: '70%', height: '58%', alignItems: 'center' }}>
          <View style={{ height: '95%' }}>
            <View style={{ flex: 1, border: 1, maxHeight: 30, alignItems: 'center', marginTop: -30, width: 250 }}>
              <Row >
                <Col style={{ width: '40%' }}>
                </Col>
                <Col style={{ width: '60%' }}>
                  <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 14, fontWeight: 'bold', width: '80%', textAlign: 'center' }}>Select {this.state.groupname}</Text>
                </Col>
                <Col style={{ width: '20%' }} onPress={() => this.handleCancel()}>
                  <Icon name='ios-close' style={{ color: Colors.navbarBackgroundColor }} />
                </Col>
              </Row>
            </View>
            <View style={{ flex: 1, width: 250, maxHeight: 200 }}>
              <Grid style={{ height: '100%', borderTopWidth: 1, borderColor: '#ccccde' }}>
                <Row>
                  <Col style={{ justifyContent: 'center', alignItems: 'center', width: '48%', height: '100%' }}>
                    <Image
                      style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 110 }}
                      source={{ uri: "http://dev-fs.8d.ie/storage/" + this.state.cover }}
                    ></Image>
                  </Col>
                  <Col style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>{this.state.name}</Text>
                    <Text style={{ fontSize: 12 }}>{this.state.description}</Text>
                  </Col>
                </Row>
              </Grid>
            </View>
            <View style={{ borderTopWidth: 1, borderColor: '#ccccde', flex: 1, width: 250, maxHeight: 200, marginBottom: -100 }}>
              <Grid>
                <Col style={{ width: '15%' }}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Button block icon transparent onPress={() => this.setState({ quantity: this.state.quantity > 1 ? this.state.quantity - 1 : 1 })} >
                      <Icon name='ios-remove' style={{ color: Colors.navbarBackgroundColor }} />
                    </Button>
                  </View>
                </Col>
                <Col style={{ width: '20%' }}>
                  <View style={{ paddingRight: 10, paddingTop: 10 }}>
                    <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 14, marginLeft: 10 }}>{this.state.quantity}</Text>
                  </View>
                </Col>
                <Col style={{ width: '20%' }}>
                  <Button block icon transparent onPress={() => this.addingredient()}>
                    <Icon style={{ color: Colors.navbarBackgroundColor }} name='ios-add' />
                  </Button>
                </Col>
                <Col style={{ width: '45%' }}>
                  <View style={{ paddingTop: 10 }}>
                    <Dialog.Button label="Add" style={{ width: 60, height: 30, marginRight: -20, padding: 3, textAlign: 'center', color: 'white', borderRadius: 100, borderWidth: 1, backgroundColor: 'orange', borderColor: 'orange' }} onPress={() => this.addToBasket()} />
                  </View>
                </Col>
              </Grid>
            </View>
          </View>
        </Dialog.Container>
        <Card transparent>
          <CardItem cardBody>
            {this.props.product.isgroup == true ?
              <View style={{ flex: 1 }}>
                <Button transparent style={style.button}>
                  <Image source={{ uri: "http://dev-fs.8d.ie/storage/" + this.props.product.cover }} style={style.image} />
                </Button>
              </View>
              :
              <View style={{ flex: 1 }}>
                <Button transparent style={style.button} onPress={() => this.pressed(true, this.props.product)}>
                  <Image source={{ uri: "http://dev-fs.8d.ie/storage/" + this.props.product.cover }} style={style.image} />
                </Button>
                {this.getindiqty(this.props.product)}
              </View>
            }
          </CardItem>
        </Card>
      </Col >
    );
  }

  getindiqty(product) {
    let items = [];

    global.ingList.map((item) => {
      if (item.name == product.name) {
        items.push(
          <View >
            <Button style={{ position: 'absolute', bottom: 80, right: 5, justifyContent: 'center', alignItems: 'center', height: 15, width: 15, backgroundColor: Colors.navbarBackgroundColor, borderRadius: 200 / 2 }} onPress={() => this.removeingredient(item)} transparent>
              <View  >
                <Icon name='ios-close' style={{ color: 'black' }} />
              </View>
            </Button>
            <View style={{ position: 'absolute', bottom: 15, right: 15, justifyContent: 'center', alignItems: 'center', height: 15, width: 15, backgroundColor: Colors.navbarBackgroundColor, borderRadius: 200 / 2 }}>
              <Text style={{ color: 'white' }}>{item.quantity}</Text>
            </View>
          </View >
        );
      }
    })
    return items

  }

  removeingredient(item) {
    Alert.alert(
      'Remove ' + item.name,
      'Are you sure you want remove ?',
      [
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => this.removeItem(item) },
      ]
    )
  }

  removeItem(itemToRemove) {
    let items = [];
    global.ingList.map((item) => {
      if (JSON.stringify(item.id) !== JSON.stringify(itemToRemove.id))
        items.push(item);
    });
    global.ingList = items;
    AsyncStorage.setItem("INGREDIENT", JSON.stringify(global.ingList));
    this.getindiqty(itemToRemove)
  }

  addingredient() {
    if ((this.state.quantity + 1) <= this.state.max) {
      this.setState({ quantity: this.state.quantity + 1 })
    }
    else {
      Toast.show({
        text: 'You have reached the maximum limit of qty! ',
        position: 'bottom',
        type: 'warning',
        buttonText: 'Dismiss',
        duration: 3000
      });
    }
  }

  pressed(visible, product) {
    if (product.iscreate) {
      this.setState({ dialogVisible: visible });
      this.setState({ cover: product.cover });
      this.setState({ name: product.name });
      this.setState({ description: product.description });
      this.setState({ dish_id: product.id });
      this.setState({ max: product.max });
      this.setState({ groupmax: product.groupmax });
      this.setState({ ingredient_group_id: product.ingredient_group_id });
      this.setState({ groupname: product.groupname });
      this.setState({ price: product.price });
      AsyncStorage.getItem("INGREDIENT", (err, res) => {
        if (!res) {
          this.setState({ quantity: 1 });
        } else {
          var ingrediList = JSON.parse(res);
          ingrediList.map((item) => {
            if (item.name == this.state.name) {
              this.setState({ quantity: item.quantity });
            }
          });
        }
      })
    }
  }


  addToBasket() {
    var success = false;
    var isqtyupdate = false;
    var isgroupmax = false;
    var ingredientsList = [];
    var ingredients = this.state.ingredients;
    ingredients['id'] = this.state.dish_id;
    ingredients['quantity'] = this.state.quantity;
    ingredients['name'] = this.state.name;
    ingredients['price'] = this.state.price;
    ingredients['group_id'] = this.state.ingredient_group_id;
    AsyncStorage.getItem("INGREDIENT", (err, res) => {
      if (!res) {
        var ing = [];
        ing.push(ingredients)
        AsyncStorage.setItem("INGREDIENT", JSON.stringify(ing));
      }
      else {
        var group_count = 0;
        ingredientsList = JSON.parse(res);
        ingredientsList.map((item) => {
          if (item.name == this.state.name) {
            if (item.quantity == this.state.quantity) {
              success = true;
            } else {
              item.quantity = this.state.quantity
              isqtyupdate = true
            }
          }
          if (item.group_id == this.state.ingredient_group_id) {
            group_count++
          }
        });

        if (this.state.groupmax == group_count) {
          isgroupmax = true;
        }
      }
      if (success) {
        Toast.show({
          text: 'This ingredient already exist !',
          position: 'bottom',
          type: 'danger',
          buttonText: 'Dismiss',
          duration: 3000
        });
        AsyncStorage.setItem("INGREDIENT", JSON.stringify(ingredientsList));
        this.handleCancel();
      }
      else {
        if (isqtyupdate) {
          Toast.show({
            text: 'Ingredient update quantity !',
            position: 'bottom',
            type: 'success',
            buttonText: 'Dismiss',
            duration: 3000
          });
          AsyncStorage.setItem("INGREDIENT", JSON.stringify(ingredientsList));
        } else {
          if (isgroupmax) {
            Toast.show({
              text: 'You have reached the maximum limit of group qty! ',
              position: 'bottom',
              type: 'danger',
              buttonText: 'Dismiss',
              duration: 3000
            });
          } else {
            ingredientsList.push(ingredients);
            Toast.show({
              text: 'Ingredient added to your dish !',
              position: 'bottom',
              type: 'success',
              buttonText: 'Dismiss',
              duration: 3000
            });
            AsyncStorage.setItem("INGREDIENT", JSON.stringify(ingredientsList));
            this.handleCancel()
          }
        }
      }


      AsyncStorage.getItem("INGREDIENT", (err, res) => {
        if (!res) {
          global.ingList = []
        }
        else {
          global.ingList = JSON.parse(res)
          this.getindiqty(this.state)
        }
      });
    });
  }
}

const style = {
  button: { flex: 1, height: 100, marginTop: 0 },
  image: { height: 100, width: null, flex: 1 },
  border: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(253, 253, 253, 0.2)'
  },
  price: {
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
    zIndex: 1000,
    backgroundColor: '#fdfdfd'
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#7f8c8d',
    position: 'absolute',
    top: '52%'
  }
}
