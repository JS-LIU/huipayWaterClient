/**
 * Created by LDQ on 2017/7/19.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';

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
                <span>总数：</span>
                <span>{this.props.shoppingCart.totalCount}</span>
                <span>总价：</span>
                <span>{this.props.shoppingCart.totalPrice}</span>
                <span>全选：</span>
                <input type="checkbox" checked={this.props.shoppingCart.isAllChecked} onChange={this.allCheck.bind(this)}/>
            </View>
        )
    }
}
module.exports = ShoppingCartFooterView;