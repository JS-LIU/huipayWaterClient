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
import ShopFooterView from './ShopFooterView';
import ShoppingCartView from './ShoppingCartView';

import myStyle from '../css/myStyle.css';
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
        this.props.shoppingList.getList();
    }
    showShoppingCart(){
        this.props.shoppingList.showShoppingCart();
    }
    render(){
        let clientHeight = document.body.clientHeight;
        let remRate = _h.ui.parsePx();
        let maxHeight = clientHeight + (3 * remRate);
        let shoppingMaxHeight = clientHeight - 0.8 * remRate;
        return (
            <View style={{maxHeight:maxHeight + "px",overflow:"hidden"}}>
                {this.props.shoppingList.show?<Button onClick={this.showShoppingCart.bind(this)}  className={shopStyle.shadow}/>:''}
                <ReceiveAddressView />
                <HeadShopInfoView />
                <ul className={shopStyle.nav_link}>
                    <li className={shopStyle.nav_link_product_text}>商品</li>
                    <li>评价</li>
                </ul>
                <View className={shopStyle.shopping_list} style={{maxHeight:shoppingMaxHeight+'px',overflow:'hidden'}}>
                    <TypeList />
                    <ProductList />
                </View>
                <Link to="/my" className={myStyle.link_my}/>
                <ShopFooterView history={this.props.history}/>
                {this.props.shoppingList.show?<ShoppingCartView />:''}
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
@inject(['productDetail'])
@observer class WaterTicket extends Component{
    constructor(props){
        super(props);
    }
    selectedSpecification(){
        this.props.productItem.showProductList();
        console.log(this.props.productItem);
        this.props.shoppingList.selectedProductItem(this.props.productItem);

        this.props.productItem.unSelectedAll();
        //  默认选中第一个
        this.props.productItem.productItemModels[0].selectedItem();
    }
    setActiveProduct(){
        this.props.productDetail.setProductId(this.props.productItem.productItemModels[0].productItemId);
    }
    render(){
        return (
            <li className={shopStyle.water_ticket}>
                <View className={shopStyle.water_ticket_left_border_b}/>
                <Link to="/productDetail"
                      className={shopStyle.ticket_left} onClick={this.setActiveProduct.bind(this)}>
                    <View className={shopStyle.water_ticket_img_product}>
                        <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.water_ticket_img}/>
                    </View>
                    <Text className={shopStyle.water_ticket_name}>{this.props.productItem.name}</Text>
                </Link>
                <View className={shopStyle.ticket_right}>
                    <Button className={shopStyle.select_product} onClick={this.selectedSpecification.bind(this)}>选套餐</Button>
                </View>

            </li>
        )
    }
}

@inject(['productDetail'])
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
    setActiveProduct(){
        console.log(this.props.productItem);
        this.props.productDetail.setProductId(this.props.productItem.productItemId);
    }
    render(){
        return (
            <li className={shopStyle.product_item}>
                <Link to="/productDetail"
                      className={shopStyle.product_item_img_protect}
                      onClick={this.setActiveProduct.bind(this)}>
                    <img src={this.props.productItem.imageUrl} alt="" className={shopStyle.product_item_img}/>
                </Link>
                <View className={shopStyle.product_item_info}>
                    <Text className={shopStyle.product_item_name}>{this.props.productItem.name}</Text>
                    <View className={shopStyle.product_item_mount_sale}>
                        <Text className={shopStyle.product_item_sale_title}>月售</Text>
                        <Text className={shopStyle.product_item_sale}>{this.props.productItem.saleMount}</Text>
                    </View>
                    <View className={shopStyle.product_item_info_count}>
                        <View>
                            <Text className={shopStyle.rmb}>￥</Text>
                            <Text className={shopStyle.price}>{this.props.productItem.currentPrice / 100}</Text>
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


module.exports = ShopView;
const selectedColor = {
    color:"#399cfe",
    borderLeft:"0.06rem solid #399cfe"
};
const selectedBg = {
    background:"#FFF"
};