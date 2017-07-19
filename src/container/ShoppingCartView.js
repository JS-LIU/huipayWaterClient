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
            console.log(item);
            return(
                <li key = {index}>
                    <input type="checkbox" checked={item.checked}  onChange={this.check(item)}/>
                    <span>{item.productName}</span>
                    <span>===========</span>
                    <span onClick={this.increase(item)}>+</span>
                    <span>{item.count}</span>
                    <span onClick={this.reduce(item)}>-</span>
                </li>
            )
        });

        return (
            <View>
                {productNodes}
                <ShoppingCartFootView/>
            </View>
        )
    }
}

module.exports = ShoppingCartView;