/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';

//  MobX
import {observer,inject} from 'mobx-react';

import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';

import shopStyle from '../css/shopStyle.css';

@inject(['shoppingList'])
@observer class ShoppingCartView extends Component{
    constructor(props){
        super(props)
    }
    increase(productItem){
        return()=>{
            productItem.increase();
        }
    }
    reduce(productItem){
        return ()=>{
            productItem.reduce();
        }
    }
    clearShoppingCart(){
        this.props.shoppingList.clearShoppingCart()
    }
    render(){
        let productNodes = this.props.shoppingList.shoppingCart.map((productItem,index)=>{
            return (
                <li key={index} className={shopStyle.shopping_cart_product}>
                    <View className={shopStyle.shopping_cart_product_info}>
                        <Text className={shopStyle.shopping_cart_product_name}>{productItem.name}</Text>
                        {productItem.type === "waterTicket"?<Text className={shopStyle.shopping_cart_product_specification}>{productItem.productName}</Text>:''}
                        <View className={shopStyle.shopping_cart_product_price}>
                            <Text>￥</Text>
                            <Text className={shopStyle.shopping_cart_product_total_price}>{productItem.currentPrice / 100}</Text>
                        </View>
                    </View>
                    <View className={shopStyle.product_item_ctrl}>
                        <Button className={shopStyle.product_reduce} onClick={this.reduce(productItem)} />
                        <Text className={shopStyle.product_count}>{productItem.selectCount}</Text>
                        <Button className={shopStyle.product_increase} onClick={this.increase(productItem)} />
                    </View>
                </li>
            )

        });
        return (
            <View className={shopStyle.shopping_cart}>
                <ul className={shopStyle.shopping_cart_title}>
                    <li className={shopStyle.shopping_cart_title_text}>已选商品</li>
                    <li>
                        <Button
                            className={shopStyle.shopping_cart_clear_all}
                            onClick={this.clearShoppingCart.bind(this)}
                        >清空</Button>
                    </li>
                </ul>
                <ul className={shopStyle.shopping_cart_list}>
                    {productNodes}
                </ul>
            </View>

        )
    }
}

module.exports = ShoppingCartView;