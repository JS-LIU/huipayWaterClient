/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

import View from './View';
import footerNavStyle from '../css/footerNavStyle.css';

class Footer_nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View className = {footerNavStyle.nav_bar}>
                <NavLink to="/home" className={footerNavStyle.home} activeClassName={footerNavStyle.home_active}>
                    <span>订水</span>
                </NavLink>
                <NavLink to="/waterShopList" className={footerNavStyle.station} activeClassName={footerNavStyle.station_active}>水站</NavLink>
                <NavLink to="/shoppingCart" className={footerNavStyle.shoppingCart} activeClassName={footerNavStyle.shoppingCart_active}>购物车</NavLink>
                <NavLink to="/My" className={footerNavStyle.my} activeClassName={footerNavStyle.my_active}>我</NavLink>
            </View>
        );
    }
}




module.exports = Footer_nav;