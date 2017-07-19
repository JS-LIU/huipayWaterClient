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
    increase(item){
        return ()=>{
            console.log("increase======",item);

            // this.props.shoppingCart.increase();
        }
    }
    check(item){
        return ()=>{
            item.check();
            console.log('check=====',item);
        }
    }
    render(){
        let productNodes = this.props.shoppingCart.cartList.map((item,index)=>{
            return(
                <li key={index}>
                    <input type="checkbox"  onChange={this.check(item)}/>
                    <span>{item.productName}</span>
                    <span>===========</span>
                    <span onClick={this.increase(item)}>+</span>
                    <span>{item.count}</span>
                    <span>-</span>
                </li>
            )
        });

        return (
            <View>
                {productNodes}

            </View>
        )
    }
}

module.exports = ShoppingCartView;