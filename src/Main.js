// React native and others libraries imports
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Root } from 'native-base';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Hotdeals from './page/Hotdeals';
import Login from './page/Login';
import Register from './page/Register';
import Logout from './page/Logout';
import SaveEmail from './page/SaveEmail';
import UserProfile from './page/UserProfile';
import EditProfile from './page/EditProfile';
import ImageCapture from './page/ImageCapture';
import Vender from './page/Vender';
import VenderDetails from './page/VenderDetails';
import DishCreate from './page/DishCreate';
import DishList from './page/DishList';
import ImageGallery from './page/ImageGallery';
import DishShare from './page/DishShare';
import FavouriteDish from './page/FavouriteDish';
import Notification from './page/Notification';
import Friends from './page/Friends';
import History from './page/History';
import VenderMenu from './page/VenderMenu';
import AddToBasket from './page/AddToBasket';
import Checkout from './page/Checkout';


export default class Main extends Component {
    // componentWillMount = () => {
    //     BackHandler.addEventListener('hardwareBackPress', () => Actions.pop());
    // };
    render() {
        return (
            <Root>
                <Router>
                    <Scene key="root">
                        <Scene key="hotdeals" component={Hotdeals} hideNavBar />
                        <Scene key="login" component={Login} hideNavBar />
                        <Scene key="register" component={Register} hideNavBar />
                        <Scene key="logout" component={Logout} hideNavBar />
                        <Scene key="saveemail" component={SaveEmail} hideNavBar />
                        <Scene key="userprofile" component={UserProfile} hideNavBar />
                        <Scene key="editprofile" component={EditProfile} hideNavBar />
                        <Scene key="vender" component={Vender} hideNavBar />
                        <Scene key="venderdetails" component={VenderDetails} hideNavBar />
                        <Scene key="dishcreate" component={DishCreate} hideNavBar />
                        <Scene key="dishlist" component={DishList} hideNavBar />
                        <Scene key="dishshare" component={DishShare} hideNavBar />
                        <Scene key="favouritedish" component={FavouriteDish} hideNavBar />
                        <Scene key="notification" component={Notification} hideNavBar />
                        <Scene key="friends" component={Friends} hideNavBar />
                        <Scene key="history" component={History} hideNavBar />
                        <Scene key="vendermenu" component={VenderMenu} hideNavBar />
                        <Scene initial key="addtobasket" component={AddToBasket} hideNavBar />
                        <Scene key="checkout" component={Checkout} hideNavBar />
                        <Scene key="imagecapture" component={ImageCapture} hideNavBar />
                        <Scene key="imageGallery" component={ImageGallery} modal hideNavBar />
                    </Scene>
                </Router>
            </Root>
        );
    }
}