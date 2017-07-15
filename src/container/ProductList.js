/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ProductTypes from './ProductTypes';

@inject (['productList'])
@inject (['shoppingCart'])
@observer class ProductList extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.productList.getList(0,6);
    }
    addShoppingCart(item){
        return ()=>{

            console.log(item.productName);
        }
    }
    render(){
        let ProductNodes = this.props.productList.content.map((item,index)=>{
            return (
                <li key={index}>
                    <span>{item.productName}</span>
                    <span onClick={this.addShoppingCart(item)}>==========加入购物车</span>
                </li>
            )
        });
        return (
            <View>
                <ProductTypes />
                <View>
                    {ProductNodes}
                </View>

            </View>
        )
    }
}

module.exports = ProductList;