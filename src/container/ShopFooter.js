/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShoppingCartProduct from '../MobX/domain/ShoppingCartProduct';
import shopFooterStyle from '../css/shopFooterStyle.css';

@inject (['shoppingCart'])
@observer class ShopFooter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View className={shopFooterStyle.shop_ooter}>
                <View className={shopFooterStyle.serve}>
                    <div className={shopFooterStyle.serve_mine}>我的</div>
                    <Link to="/shoppingCart" className={shopFooterStyle.server_cart}>
                        <span className={shopFooterStyle.cart_num}>{this.props.shoppingCart.total}</span>
                        <span>购物车</span>
                    </Link>
                </View>
                <View className={shopFooterStyle.settle}>
                    <div className={shopFooterStyle.purchase}>去结算</div>
                </View>
            </View>
        )
    }
}

module.exports = ShopFooter;