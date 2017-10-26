/**
 * Created by LDQ on 2017/10/26
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//  components
import View from '../components/View';
import Button from '../components/Button';

import shopStyle from '../css/shopStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['shoppingList'])
@inject (['order'])
@inject (['shopInfo'])
@observer class ShopFooterView extends Component{
    constructor(props){
        super(props);
    }
    showShoppingCart(){
        this.props.shoppingList.showShoppingCart();
    }
    confirmOrder(){
        this.props.order.setOrderType({shopId:this.props.shopInfo.shopId});
        this.props.order.getSettleOrder({shopId:this.props.shopInfo.shopId},"default",this.props.history);
    }
    render(){
        return (
            <View className={shopStyle.shop_footer}>
                <View className={shopStyle.shopping_cart_info}>
                    <Button className={shopStyle.shopping_cart_btn} onClick={this.showShoppingCart.bind(this)}>
                        <View className={shopStyle.shopping_cart_total_count}>{this.props.shoppingList.totalCount}</View>
                    </Button>
                    <ul className={shopStyle.shopping_cart_info_total}>
                        <li className={shopStyle.shopping_cart_info_total_price_title}>共</li>
                        <li className={shopStyle.shopping_cart_info_total_price_rmb}>￥</li>
                        <li className={shopStyle.shopping_cart_info_total_price}>{this.props.shoppingList.totalPrice / 100}</li>
                    </ul>
                </View>
                {this.props.shoppingList.shoppingCart.length > 0 ?
                    <Link to='/confirmOrder'
                          className={shopStyle.confirm_order_btn}
                          onClick={this.confirmOrder.bind(this)}>去结算</Link>:
                    <View className={shopStyle.cant_confirm_order_btn}>去结算</View>}
            </View>
        )
    }
}
module.exports = ShopFooterView;