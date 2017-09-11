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
                <Text className={shopStyle.notice}>喜腾山泉品牌水票在本平台所有水站通用</Text>
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
                <li key={index} className={shopStyle.type_item}>
                    {typeItem.name}
                </li>
            )
        });
        return (
            <ul className={shopStyle.type_list}>
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
                if(productItem.type === "waterTicket"){
                    return (<WaterTicket productItem={productItem}/>)
                }else{
                    return (<ProductItem productItem={productItem}/>)
                }

            });
            return (
                <li key={index} >
                    <Text className={shopStyle.type_title}>{typeItem.name}</Text>
                    <ul>
                        {productList}
                    </ul>
                </li>
            )
        });
        return (
            <View className={shopStyle.product_list}>
                {productNodes}
            </View>
        )
    }
}

class WaterTicket extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li className={shopStyle.water_ticket}>
                <View className={shopStyle.ticket_left}>
                    <View className={shopStyle.water_ticket_img_product}>
                        <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.water_ticket_img}/>
                    </View>
                    <Text>{this.props.productItem.name}</Text>
                </View>
                <View className={shopStyle.ticket_right}>
                    <Text>选套餐</Text>
                </View>
            </li>
        )
    }
}
class ProductItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li className={shopStyle.product_item}>
                <View className={shopStyle.product_item_img_protect}>
                    <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.product_item_img}/>
                </View>
                <View>
                    <Text>{this.props.productItem.name}</Text>
                    <View>
                        <View>
                            <Button>-</Button>
                            <Text>{this.props.productItem.selectCount}</Text>
                            <Button>+</Button>
                        </View>
                    </View>
                </View>
            </li>
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