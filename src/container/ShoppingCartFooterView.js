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
@inject(['order'])
@observer class ShoppingCartFooterView extends Component {
    constructor(props) {
        super(props);
        this.settle = this.settle.bind(this);
    }
    allCheck(){
        this.props.shoppingCart.allCheck();
    }
    settle(){
        let checkedProductList = this.props.shoppingCart.checkedProductList;
        this.props.order.getSettleOrder(checkedProductList);
        this.props.shoppingCart.deleteProduct();
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
                    <Link to="/createOrder"
                          className={shoppingCartFooterStyle.set_account}
                          onClick={this.settle}>
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