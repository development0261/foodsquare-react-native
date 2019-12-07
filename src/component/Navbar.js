import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon, View, Text } from 'native-base';

// Our custom files and classes import
import Colors from '../Colors';

export default class Navbar extends Component {

  render() {
    return (
      <Header
        transparent
        style={{ backgroundColor: Colors.navbarBackgroundColor, zIndex: 1, height: this.props.height }}
        backgroundColor={Colors.navbarBackgroundColor}
        androidStatusBarColor={Colors.statusBarColor}
        noShadow={true}
      >
        {this.props.left ? this.props.left : <Left style={{ flex: 1 }} />}
        <Body style={styles.body, { marginBottom: this.props.marginBottom }}>
          <Title style={styles.title, { marginLeft: this.props.marginLeft, fontSize: this.props.fontSize }}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{ flex: 1 }} />}
      </Header>
    );
  }
}

const styles = {
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom: 15,

  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontWeight: '100',

  }
};
