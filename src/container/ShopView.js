/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//  components
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import ScrollView from '../components/ScrollView';
import ReceiveAddressView from './ReceiveAddressView';
import HeadShopInfoView from './HeadShopInfoView'
import ProductListDialogView from './ProductListDialogView';

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
        this.props.shoppingList.getList(1);
    }
    render(){
        let clientHeight = document.body.clientHeight;
        let remRate = _h.ui.parsePx();
        let maxHeight = clientHeight + (3 * remRate);
        let shoppingMaxHeight = clientHeight - 0.8 * remRate;
        return (
            <View style={{maxHeight:maxHeight + "px",overflow:"hidden"}}>
                {this.props.shoppingList.show?<View className={shopStyle.shadow}/>:''}
                <ReceiveAddressView />
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
                <ShopFooter />
                {this.props.shoppingList.show?<ShoppingCart />:''}
                {this.props.shoppingList.activeProductItem.show?<ProductListDialogView waterTicket={this.props.shoppingList.activeProductItem}/>:""}
            </View>
        )
    }
}
@inject(['shoppingList'])
@observer class TypeList extends Component{
    constructor(props){
        super(props);
    }
    selectedType(item){
        return (e)=>{
            e.preventDefault();
            let moveDom = document.getElementById('productList');
            this.props.shoppingList.selectedType(moveDom,item);
        }
    }
    render(){
        let typeNodes = this.props.shoppingList.tagModelList.map((typeItem,index)=>{
            return (
                <li key={index} className={shopStyle.type_item} style={typeItem.selected?selectedBg:{}} onClick={this.selectedType(typeItem)}>
                    {typeItem.selectCount === 0?"":<View className={shopStyle.product_list_total_count}>{typeItem.selectCount}</View>}
                    <Text className={shopStyle.type_item_title} style={typeItem.selected?selectedColor:{}}>{typeItem.name}</Text>
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
    cutType(e){
        let scrollTop = e.target.scrollTop;
        this.props.shoppingList.autoSelectedType(scrollTop);
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
            <ScrollView
                id="productList"
                className={shopStyle.product_list}
                style={{maxHeight:maxHeight+'px'}}
                onScrollCapture={this.cutType.bind(this)}>
                {productNodes}
            </ScrollView>
        )
    }
}


@inject(['shoppingList'])
@observer class WaterTicket extends Component{
    constructor(props){
        super(props);
    }
    selectedSpecification(){
        this.props.productItem.showProductList();
        this.props.shoppingList.selectedProductItem(this.props.productItem);
        //  默认选中第一个
        this.props.productItem.productItemModels[0].selectedItem();
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
                    <Button className={shopStyle.select_product} onClick={this.selectedSpecification.bind(this)}>选套餐</Button>
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
                                <Button className={shopStyle.product_reduce} onClick={this.reduce(this.props.productItem)} />:""}
                            {this.props.productItem.selectCount > 0?
                                <Text className={shopStyle.product_count}>{this.props.productItem.selectCount}</Text>:""}

                            <Button className={shopStyle.product_increase} onClick={this.increase(this.props.productItem)} />
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
                <li key={index} className={shopStyle.shopping_cart_product}>
                    <View className={shopStyle.shopping_cart_product_info}>
                        <Text className={shopStyle.shopping_cart_product_name}>{productItem.name}</Text>
                        {productItem.type === "waterTicket"?<Text className={shopStyle.shopping_cart_product_specification}>{productItem.productName}</Text>:''}
                        <View className={shopStyle.shopping_cart_product_price}>
                            <Text>￥</Text>
                            <Text className={shopStyle.shopping_cart_product_total_price}>{productItem.currentPrice}</Text>
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
                        <Button className={shopStyle.shopping_cart_clear_all}>清空</Button>
                    </li>
                </ul>
                <ul className={shopStyle.shopping_cart_list}>
                    {productNodes}
                </ul>
            </View>

        )
    }
}

@inject(['shoppingList'])
@inject (['order'])
@observer class ShopFooter extends Component{
    constructor(props){
        super(props);
    }
    showShoppingCart(){
        this.props.shoppingList.showShoppingCart();
    }
    confirmOrder(){
        this.props.order.getSettleOrder(1);
    }
    render(){
        return (
            <View className={shopStyle.shop_footer}>
                <View className={shopStyle.shopping_cart_info}>
                    <Button className={shopStyle.shopping_cart_btn} onClick={this.showShoppingCart.bind(this)}>
                        <View className={shopStyle.shopping_cart_total_count}>{this.props.shoppingList.totalCount}</View>
                    </Button>
                    <ul className={shopStyle.shopping_cart_info_total}>
                        <li className={shopStyle.shopping_cart_info_total_price_title}>共</li>
                        <li className={shopStyle.shopping_cart_info_total_price_rmb}>￥</li>
                        <li className={shopStyle.shopping_cart_info_total_price}>{this.props.shoppingList.totalPrice}</li>
                    </ul>
                </View>
                <Link to='/confirmOrder' className={shopStyle.confirm_order_btn} onClick={this.confirmOrder.bind(this)}>去结算</Link>
            </View>
        )
    }
}
module.exports = ShopView;
const selectedColor = {
    color:"#399cfe",
    borderLeft:"0.06rem solid #399cfe"
};
const selectedBg = {
    background:"#FFF"
};