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
import _h from '../Util/HB';


//  MobX
import {observer,inject} from 'mobx-react';
@inject(['shoppingList'])

@observer class ShopView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shoppingList.getList(3);
    }
    render(){
        let clientHeight = document.body.clientHeight;
        let remRate = _h.ui.parsePx();
        let maxHeight = clientHeight + (3 * remRate);
        let shoppingMaxHeight = clientHeight - 0.8 * remRate;
        return (
            <View style={{maxHeight:maxHeight + "px",overflow:"hidden"}}>
                <ReceiveAddressView current={this.props.location.pathname}/>
                <HeadShopInfoView />
                {/*<Text className={shopStyle.notice}>喜腾山泉品牌水票在本平台所有水站通用</Text>*/}
                <ul className={shopStyle.nav_link}>
                    <li className={shopStyle.nav_link_product_text}>商品</li>
                    <li>评价</li>
                </ul>
                <View className={shopStyle.shopping_list} style={{maxHeight:shoppingMaxHeight+'px',overflow:'hidden'}}>
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
    render(){
        let clientHeight = document.body.clientHeight;
        let remRate = _h.ui.parsePx();
        let maxHeight = clientHeight - 0.8 * remRate;
        let productNodes = this.props.shoppingList.tagModelList.map((typeItem,index)=>{
            let productList = typeItem.productList.list.map((productItem,index)=>{
                if(productItem.type === "waterTicket"){
                    return (<WaterTicket productItem={productItem} key={index}/>)
                }else{
                    return (<ProductItem productItem={productItem} key={index}/>)
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
            <View className={shopStyle.product_list} style={{maxHeight:maxHeight+'px',overflow:'auto'}}>
                {productNodes}
            </View>
        )
    }
}

@observer class WaterTicket extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li className={shopStyle.water_ticket}>
                <View className={shopStyle.water_ticket_left_border_b}/>
                <View className={shopStyle.ticket_left}>
                    <View className={shopStyle.water_ticket_img_product}>
                        <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.water_ticket_img}/>
                    </View>
                    <Text className={shopStyle.water_ticket_name}>{this.props.productItem.name}</Text>
                </View>
                <View className={shopStyle.ticket_right}>
                    <Button className={shopStyle.select_product}>选套餐</Button>
                </View>
            </li>
        )
    }
}
@observer class ProductItem extends Component{
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
        return (
            <li className={shopStyle.product_item}>
                <View className={shopStyle.product_item_img_protect}>
                    <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.product_item_img}/>
                </View>
                <View className={shopStyle.product_item_info}>
                    <Text className={shopStyle.product_item_name}>{this.props.productItem.name}</Text>
                    <View className={shopStyle.product_item_mount_sale}>
                        <Text className={shopStyle.product_item_sale_title}>月售</Text>
                        <Text className={shopStyle.product_item_sale}>{this.props.productItem.saleMount}</Text>
                    </View>
                    <View className={shopStyle.product_item_info_count}>
                        <View>
                            <Text className={shopStyle.rmb}>￥</Text>
                            <Text className={shopStyle.price}>{this.props.productItem.currentPrice}</Text>
                        </View>
                        <View className={shopStyle.product_item_ctrl}>
                            {this.props.productItem.selectCount > 0?
                                <Button className={shopStyle.product_reduce} onClick={this.reduce(this.props.productItem)}>-</Button>:""}
                            {this.props.productItem.selectCount > 0?
                                <Text className={shopStyle.product_count}>{this.props.productItem.selectCount}</Text>:""}

                            <Button className={shopStyle.product_increase} onClick={this.increase(this.props.productItem)}>+</Button>
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