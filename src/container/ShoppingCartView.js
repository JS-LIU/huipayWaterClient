/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';
import ShoppingCartFootView from './ShoppingCartFooterView';

//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import shoppingCartStyle from '../css/shoppingCartStyle.css'

@inject (['shoppingCart'])
@observer class ShoppingCartView extends Component{
    constructor(props){
        super(props);
    }
    increase(item){
        return ()=>{
            item.increase();
        }
    }
    reduce(item){
        return ()=>{
            item.reduce();
        }
    }
    check(item){
        return ()=>{
            item.check();
        }
    }
    render(){
        let productNodes = this.props.shoppingCart.cartList.map((item,index)=>{
            return(
                <li key={index} className={shoppingCartStyle.list_items}>
                    <input type="checkbox"
                           checked={item.checked}
                           onChange={this.check(item)}
                           className={item.checked?shoppingCartStyle.product_checked:shoppingCartStyle.product_no_checked}/>
                    <div className={shoppingCartStyle.product_info}>
                        <div className={shoppingCartStyle.product_pic_box}>
                            <img src={item.icon} alt="" className={shoppingCartStyle.product_pic}/>
                        </div>
                        <div className={shoppingCartStyle.product_detail}>
                            <p className={shoppingCartStyle.product_name}>{item.productName}</p>
                            <p className={shoppingCartStyle.product_volume}>{item.spec}</p>
                            <p className={shoppingCartStyle.product_price}>
                                <span>￥</span>
                                <span className={shoppingCartStyle.product_sale}>{item.price}</span>
                            </p>
                        </div>
                        <div className={shoppingCartStyle.plusminus}>
                            <span onClick={this.reduce(item)} className={shoppingCartStyle.cart_ctrl_reduce}>-</span>
                            <span className={shoppingCartStyle.cart_ctrl_num}>{item.count}</span>
                            <span onClick={this.increase(item)} className={shoppingCartStyle.cart_ctrl_increase}>+</span>
                        </div>
                    </div>
                </li>
            )
        });

        return (
            <View>
                <ul className={shoppingCartStyle.product_list}>
                    {productNodes}
                </ul>
                <ShoppingCartFootView/>
            </View>
        )
    }
}

module.exports = ShoppingCartView;