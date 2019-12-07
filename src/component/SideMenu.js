/**
* This is the SideMenu component used in the navbar
**/

// React native and others libraries imports
import React, { Component } from 'react';
import { ScrollView, LayoutAnimation, UIManager, Linking, Image } from 'react-native';
import { View, List, ListItem, Body, Left, Right, Icon, Item, Input, Button, Grid, Col } from 'native-base';
// import { Actions } from 'react-native-router-flux';
import { Actions as NavigationActions } from 'react-native-router-flux'

import AsyncStorage from '@react-native-community/async-storage';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHistory, faStar, faBell, faUsers, faShare, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
// Our custom files and classes import
import Text from './Text';

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchError: false,
      subMenu: false,
      subMenuItems: [],
      clickedItem: '',
      uri: null
    };

    //UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    AsyncStorage.getItem("visited_onces", (err, res) => {
      if (!res)
        this.setState({ cartItems: [] });
      else {
        var userdata = JSON.parse(res)
        // alert("http://dev-fs.8d.ie/img/" + userdata.avatar)
        this.setState({ id: userdata.id });
        this.setState({ email: userdata.email });
        this.setState({ name: userdata.name });
        this.setState({ access_token: userdata.access_token });
        this.setState({ uri: "http://dev-fs.8d.ie/img/" + userdata.avatar });
      }
    });
  }

  gotopage(navigate) {
    this.props.navigation.replace(navigate);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderMenu()}
      </ScrollView>
    );
  }

  renderMenu() {
    return (
      <View style={{ backgroundColor: '#2f2d2d', height: '100%', width: '100%', opacity: 0.9, zIndex: 1, position: 'relative' }}>
        <View>
          <View style={styles.MainContainer} >
            <Item style={{ paddingTop: 25, paddingBottom: 10 }} onPress={NavigationActions['userprofile']}>
              {this.state.uri == ""
                ?
                <Image style={{ width: 100, height: 100, borderRadius: 200 / 2, marginLeft: 0 }} source={require('../images/logonew.png')} >
                </Image>
                :
                <Image style={{ width: 100, height: 100, borderRadius: 200 / 2, marginLeft: 0 }} source={{ uri: this.state.uri }}  >
                </Image>
              }

            </Item>
          </View>
        </View>
        <View style={{ paddingRight: 40, paddingBottom: 180 }}>
          <List>
            {this.renderMenuItems()}
          </List>
        </View>
        <View style={{ paddingRight: 40 }}>
          <List>
            <ListItem
              noBorder
              button={true}
              onPress={NavigationActions['logout']}
            >
              <View style={{ backgroundColor: '#ff9500', borderRadius: 50, padding: 5 }}>
                <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'black' }} />
              </View>
              <Body>
                <Text style={{ color: 'white', paddingLeft: 10 }}>LogOut</Text>
              </Body>
            </ListItem>
          </List>
        </View>
      </View>
    );
  }

  renderMenuItems() {
    let items = [];
    menuItems.map((item, i) => {
      items.push(
        <ListItem
          last={menuItems.length === i + 1}
          noBorder
          key={item.id}
          button={true}
          onPress={NavigationActions[item.navigate]}
        >
          <View style={{ backgroundColor: '#ff9500', borderRadius: 50, padding: 5 }}>
            <FontAwesomeIcon icon={item.icon} style={{ color: 'black' }} />
          </View>
          <Body>
            <Text style={{ color: 'white', paddingLeft: 10 }} >{item.title}</Text>
          </Body>
        </ListItem>
      );
    });
    return items;
  }

}

const styles = {
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#2f2d2d',
    opacity: 0.9,
    zIndex: 1,
    height: '100%',
    width: '100%'
  },
  line: {
    width: '100%',
    height: 1,
    // backgroundColor: 'rgba(189, 195, 199, 0.6)',
    marginTop: 10,
    marginBottom: 10
  }
};

var menuItems = [
  {
    id: 1,
    title: 'favourite',
    icon: faStar,
    navigate: 'favouritedish'
  },
  {
    id: 2,
    title: 'history',
    icon: faHistory,
    navigate: 'history'
  },
  {
    id: 3,
    title: 'share',
    icon: faShare,
    navigate: 'dishshare'
  },
  {
    id: 4,
    title: 'notification',
    icon: faBell,
    navigate: 'notification'
  },
  {
    id: 4,
    title: 'friends',
    icon: faUsers,
    navigate: 'friends'
  }
];


const menusSecondaryItems = [
  {
    id: 190,
    title: 'Login',
    icon: 'ios-person',
    key: 'login'
  },
  {
    id: 519,
    title: 'Signup',
    icon: 'ios-person-add',
    key: 'signup'
  },
  {
    id: 19,
    title: 'Wish List',
    icon: 'heart',
    key: 'wishlist'
  },
  {
    id: 20,
    key: 'map',
    title: 'Store Finder',
    icon: 'ios-pin',
    key: 'map'
  },
  {
    id: 21,
    key: 'contact',
    title: 'Contact Us',
    icon: 'md-phone-portrait',
    key: 'contact'
  },
  {
    id: 23,
    key: 'newsletter',
    title: 'Newsletter',
    icon: 'md-paper',
    key: 'newsletter'
  }
];
