/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';

@inject (['shoppingCart'])
@observer class ShoppingCartView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let productNodes = this.props.shoppingCart.cartList.map((item,index)=>{
            return(
                <li>
                    <input type="checkbox"/>
                    <span>{item.productName}</span>
                    <span>===========</span>
                    <span>+</span>
                    <span>{item.count}</span>
                    <span>-</span>
                </li>
            )
        });

        return (
            <View>
                购物车

            </View>
        )
    }
}

module.exports = ShoppingCartView;