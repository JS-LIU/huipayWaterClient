/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  components
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import ReceiveAddressView from './ReceiveAddressView';
import HeadShopInfoView from './HeadShopInfoView'
import shopStyle from '../css/shopStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';
@inject(['shoppingList'])

@observer class ShopView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shoppingList.getList(1);
    }
    render(){
        return (
            <View>
                <ReceiveAddressView current={this.props.location.pathname}/>
                <HeadShopInfoView />
                <View className={shopStyle.shopping_list}>
                    <TypeList />
                    <ProductList />
                </View>
                <ShoppingCart />
            </View>
        )
    }
}
@inject(['shoppingList'])
@observer class TypeList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let typeNodes = this.props.shoppingList.tagModelList.map((typeItem,index)=>{
            return (
                <li key={index}>
                    {typeItem.name}
                </li>
            )
        });
        return (
            <ul>
                {typeNodes}
            </ul>
        )
    }
}
@inject(['shoppingList'])
@observer class ProductList extends Component{
    constructor(props){
        super(props);
    }
    increase(productItem){
        return ()=>{
            productItem.increase();
        }
    }
    reduce(productItem){
        return()=>{
            productItem.reduce();
        }
    }
    render(){
        let productNodes = this.props.shoppingList.tagModelList.map((typeItem,index)=>{
            let productList = typeItem.productList.list.map((productItem,index)=>{
                return (
                    <li key={index}>
                        <Text>{productItem.name}</Text>
                        <Button onClick={this.increase(productItem)}>+</Button>
                        <Text>{productItem.selectCount}</Text>
                        <Button onClick={this.reduce(productItem)}>-</Button>
                    </li>
                )
            });
            return (
                <li key={index}>
                    <Text>{typeItem.name}</Text>
                    <ul>
                        {productList}
                    </ul>
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

@inject(['shoppingList'])
@observer class ShoppingCart extends Component{
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

    render(){
        let productNodes = this.props.shoppingList.shoppingCart.map((productItem,index)=>{
            return (
                <li key={index}>
                    <Text>{productItem.name}</Text>
                    <Button onClick={this.increase(productItem)}>+</Button>
                    <Text>{productItem.selectCount}</Text>
                    <Button onClick={this.reduce(productItem)}>-</Button>
                </li>
            )
        });
        return (
            <ul className={shopStyle.shopping_cart}>
                {productNodes}
            </ul>
        )
    }

}

module.exports = ShopView;