/**
 * Created by LDQ on 2017/9/15
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';
import productListDialogStyle from '../css/productListDialogStyle.css';
import {observer,inject} from 'mobx-react';

@observer class ProductListDialogView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let productNodes = this.props.productItemModels.map((productItem,index)=>{
            return (
                <li key={index} className={productListDialogStyle.product_item}>
                    {productItem.name}
                </li>
            )
        });
        return (
            <View className={productListDialogStyle.product_list_dialog}>
                <View className={productListDialogStyle.header}>
                    <Text>选择套餐</Text>
                </View>
                <View className={productListDialogStyle.center}>
                    <Text className={productListDialogStyle.body_title}>套餐</Text>
                    <ul className={productListDialogStyle.body_list}>
                        {productNodes}
                    </ul>
                </View>

                <View className={productListDialogStyle.footer}>
                    <Button>加入购物车</Button>
                </View>
            </View>
        )
    }
}
module.exports = ProductListDialogView;