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
import shopFooterStyle from '../css/shopFooterStyle.css';

@inject (['shoppingCart'])
@inject (['order'])
@observer class ShopFooterView extends Component{
    constructor(props){
        super(props);
        this.settle = this.settle.bind(this);
    }
    settle(){
        let checkedProductList = this.props.shoppingCart.checkedProductList;
        this.props.order.getSettleOrder(checkedProductList);
        this.props.shoppingCart.deleteProduct();
    }
    render(){
        return (
            <View className={shopFooterStyle.shop_ooter}>
                <View className={shopFooterStyle.serve}>
                    <div className={shopFooterStyle.serve_mine}>我的</div>
                    <Link to="/shoppingCart" className={shopFooterStyle.server_cart}>
                        <span className={shopFooterStyle.cart_num}>{this.props.shoppingCart.totalCount}</span>
                        <span>购物车</span>
                    </Link>
                </View>
                <View className={shopFooterStyle.settle}>
                    <Link to="/createOrder"
                          onClick={this.settle}
                          className={shopFooterStyle.purchase}>去结算</Link>
                </View>
            </View>
        )
    }
}

module.exports = ShopFooterView;