/**
 * Created by LDQ on 2017/7/19.
 */
//  react
import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom'
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
//css
import shoppingCartFooterStyle from '../css/shoppingCartFooterStyle.css';

@inject(['shoppingCart'])

@observer class ShoppingCartFooterView extends Component {
    constructor(props) {
        super(props);
    }
    allCheck(){
        this.props.shoppingCart.allCheck();
    }
    render() {
        return (
            <View>
                <div className={shoppingCartFooterStyle.cart_footer}>
                    <input type="checkbox"
                           checked={this.props.shoppingCart.isAllChecked}
                           onChange={this.allCheck.bind(this)}
                           className={this.props.shoppingCart.isAllChecked?shoppingCartFooterStyle.select_all_checked:shoppingCartFooterStyle.select_all_no_checked}/>
                    <p className={shoppingCartFooterStyle.select_all}>全选</p>
                    <p className={shoppingCartFooterStyle.product_sum}>
                        <span>合计：￥</span>
                        <span>{this.props.shoppingCart.totalPrice}</span>
                    </p>
                    <Link to="/createOrder" className={shoppingCartFooterStyle.set_account}>
                        <span>去结算</span>
                        <span className={shoppingCartFooterStyle.product_amount}>
                            ({this.props.shoppingCart.totalCount})
                        </span>
                    </Link>
                </div>
            </View>
        )
    }
}
module.exports = ShoppingCartFooterView;