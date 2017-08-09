/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ProductTypesView from './ProductTypesView';
import productListStyle from '../css/productListStyle.css';

import Button from '../components/Button';

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
                <li className={productListStyle.product} key={index}>
                    <Link to={{pathname:'/productDetail',state:{productInfo:item.productBasicInfo}}}
                          className={productListStyle.product_pic_protector}>
                        <img src={item.icon} alt="商品图片" className={productListStyle.product_pic} />
                    </Link>
                    <ul className={productListStyle.product_info}>
                        <li className={productListStyle.product_title}>
                            {item.productName}
                        </li>
                        <li className={productListStyle.product_price}>
                            <span className={productListStyle.price_icon}>￥</span>
                            <span>{item.showPrice}</span>
                        </li>
                        <li className={productListStyle.product_sold}>
                            <span>已售：</span>
                            <span>{item.soldNumber}</span>
                        </li>
                    </ul>
                    <Button className={productListStyle.shopping_cart_icon} onClick={this.addShoppingCart(item)} />
                </li>
            )
        });
        return (
            <View>
                <ProductTypesView />
                <ul className = {productListStyle.product_list}>
                    {ProductNodes}
                </ul>

            </View>
        )
    }
}

module.exports = ProductListView;