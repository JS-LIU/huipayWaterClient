/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import {Link} from 'react-router-dom';

import ProductListDialogView from './ProductListDialogView';
import ShopFooterView from './ShopFooterView';
import ShoppingCartView from './ShoppingCartView';
import productInfoStyle from '../css/productInfoStyle.css';
import shopStyle from '../css/shopStyle.css';

@inject (['productDetail'])
@inject (['shoppingList'])

@observer class ProductDetailView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shoppingList.getList();
        this.props.productDetail.getDetail();
    }
    componentWillUnmount(){
        this.props.productDetail.waterTicket.closeProductList();
    }
    increase(){
        this.props.productDetail.product.increase();
    }
    reduce(){
        this.props.productDetail.product.reduce();
    }
    showWaterTickets(){
        this.props.productDetail.waterTicket.showProductList();
        this.props.productDetail.waterTicket.productItemModels[0].selectedItem();
        this.props.productDetail.setProductId(this.props.productDetail.waterTicket.findSelectedProductItem().productItemId);
    }
    render(){
        return (
            <View className={productInfoStyle.wrap}>
                {this.props.shoppingList.show?<View className={shopStyle.shadow}/>:''}

                <Carousel className={productInfoStyle.product_pic_box}
                          list={this.props.productDetail.productImages}/>
                <View className={productInfoStyle.product_info}>
                    <Text className={productInfoStyle.product_name}>
                        {this.props.productDetail.info.name}
                    </Text>
                    <View className={productInfoStyle.product_sale_num}>
                        <Text>已售：</Text>
                        <Text>{this.props.productDetail.product.saleMount}</Text>
                    </View>
                    <View className={productInfoStyle.product_money_box}>
                        <View >
                            <Text className={productInfoStyle.current_money}>￥：</Text>
                            <Text className={productInfoStyle.current_money}>{this.props.productDetail.product.currentPrice/100}</Text>
                            <Text className={productInfoStyle.original_money_title}>原价：</Text>
                            <Text className={productInfoStyle.original_money}>{this.props.productDetail.product.originalPrice/100}</Text>
                        </View>
                        {this.props.productDetail.product.type === "entityProduct"?<View className={productInfoStyle.product_item_ctrl}>
                            {this.props.productDetail.product.selectCount > 0?
                                <Button className={productInfoStyle.product_reduce} onClick={this.reduce.bind(this)} />:""}
                            {this.props.productDetail.product.selectCount > 0?
                                <Text className={productInfoStyle.product_count}>{this.props.productDetail.product.selectCount}</Text>:""}
                            <Button className={productInfoStyle.product_increase} onClick={this.increase.bind(this)} />
                        </View>:<Button onClick={this.showWaterTickets.bind(this)}>加入购物车</Button>}
                    </View>
                </View>

                {this.props.productDetail.waterTicket.show?<ProductListDialogView waterTicket={this.props.productDetail.waterTicket}/>:""}
                {this.props.shoppingList.show?<ShoppingCartView />:''}
                <ShopFooterView history={this.props.history}/>
            </View>
        )
    }
}




module.exports = ProductDetailView;
