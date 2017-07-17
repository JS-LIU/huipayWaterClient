/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
//  components
import View from '../components/View';

import productTypeStyle from '../css/productTypeStyle.css';
class ProductTypes extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul className ={productTypeStyle.product_type}>
                <li className={productTypeStyle.type_nodes}>推荐</li>
                <li className={productTypeStyle.type_nodes}>销量</li>
                <li className={productTypeStyle.type_nodes_price}>
                    <p className={productTypeStyle.price_sort}>价格</p>
                </li>
            </ul>
        )
    }
}

module.exports = ProductTypes;