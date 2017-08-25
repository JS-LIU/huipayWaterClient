import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import {observer,inject} from 'mobx-react';
import shopShoppingCartStyle from '../css/shopShoppingCartStyle.css';


@inject(['shopShoppingCart'])

@observer class ShopShoppingCartView extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        console.log('productList:',this.props.productList);
        this.props.shopShoppingCart.getList(this.props.productList);
    }
    add(item){
        return ()=>{
            item.add();
        }
    }
    reduce(item){
        return ()=>{
            item.reduce();
        }
    }
    render(){
        let productNodes = this.props.shopShoppingCart.list.map((item,index)=>{
            return (
                <li key={index} className={shopShoppingCartStyle.product}>
                    <span>{item.info.name}</span>
                    <span onClick={this.reduce(item)}>-</span>
                    <span>{item.info.count}</span>
                    <span onClick={this.add(item)}>+</span>
                </li>
            )
        });
        return (
            <View className={shopShoppingCartStyle.shoppingCart}>
                <ul>
                    {productNodes}
                </ul>
            </View>
        )
    }
}

module.exports = ShopShoppingCartView;

