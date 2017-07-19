/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ProductTypesView from './ProductTypesView';
import productListStyle from '../css/productListStyle.css';

@inject (['productList'])
@inject (['shoppingCart'])
@observer class ProductListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.productList.getList(0,6);
    }
    addShoppingCart(item){
        return ()=>{
            this.props.shoppingCart.put(item);
        }
    }
    render(){
        let ProductNodes = this.props.productList.content.map((item,index)=>{
            return (
                <li className={productListStyle.row_productList_item} key={index}>
                    <div className={productListStyle.row_item_pic_box}>
                        <img src={item.icon} alt="商品图片" className={productListStyle.row_item_pic} />
                    </div>
                    <p className={productListStyle.row_item_title}>{item.productName}</p >
                    <p className={productListStyle.row_item_price}>
                        <span className={productListStyle.row_price_unit}>￥</span>
                        <span>{item.showPrice}</span>
                    </p >
                    <div className={productListStyle.row_item_extra}>
                        <span className={productListStyle.row_item_extra_sold}>
                            <span>已售：</span>
                            <span>{item.soldNumber}</span>
                        </span>
                        <span className={productListStyle.row_item_cart} onClick={this.addShoppingCart(item)}/>
                    </div>
                </li>

            )
        });
        return (
            <View>
                <ProductTypesView />
                <View className = {productListStyle.row_product_list}>
                    {ProductNodes}
                </View>

            </View>
        )
    }
}

module.exports = ProductListView;