/**
 * Created by LDQ on 2017/9/15
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';
import productListDialogStyle from '../css/productListDialogStyle.css';
import shopStyle from '../css/shopStyle.css';
import {observer,inject} from 'mobx-react';

@observer class ProductListDialogView extends Component{
    constructor(props){
        super(props)
    }
    selected(productItem){
        return ()=>{
            this.props.waterTicket.unSelectedAll();
            productItem.selectedItem();
        }
    }
    increase(){
        let productItem = this.props.waterTicket.findSelectedProductItem();
        productItem.increase();
    }
    reduce(){
        let productItem = this.props.waterTicket.findSelectedProductItem();
        productItem.reduce();
    }
    closeDialog(){
        this.props.waterTicket.closeProductList();
    }
    render(){
        let productNodes = this.props.waterTicket.productItemModels.map((productItem,index)=>{
            return (
                <li key={index} style={productItem.selected?selectedBg:{}} className={productListDialogStyle.product_item} onClick={this.selected(productItem)}>
                    {productItem.name}
                </li>
            )
        });
        return (
            <View style={{position:"fixed",width:"100%",height:"100%",zIndex:"12"}}>
                {this.props.waterTicket.show?<View className={productListDialogStyle.shadow} />:""}
                <View className={productListDialogStyle.product_list_dialog}>
                    <View className={productListDialogStyle.header}>
                        <Text>选择套餐</Text>
                        <Button className={productListDialogStyle.close} onClick={this.closeDialog.bind(this)}>x</Button>
                    </View>
                    <View className={productListDialogStyle.center}>
                        <Text className={productListDialogStyle.body_title}>套餐</Text>
                        <ul className={productListDialogStyle.body_list}>
                            {productNodes}
                        </ul>
                    </View>

                    <View className={productListDialogStyle.footer}>
                        <View className={productListDialogStyle.price}>
                            <Text className={productListDialogStyle.price_title}>￥</Text>
                            <Text className={productListDialogStyle.price_real}>{this.props.waterTicket.findSelectedProductItem().currentPrice}</Text>
                        </View>

                        <Button>
                            {this.props.waterTicket.findSelectedProductItem().selectCount > 0?
                                <View className={productListDialogStyle.product_item_ctrl}>
                                    <Button className={shopStyle.product_reduce} onClick={this.reduce.bind(this)}/>
                                    <Text className={shopStyle.product_count}>{this.props.waterTicket.findSelectedProductItem().selectCount}</Text>
                                    <Button className={shopStyle.product_increase} onClick={this.increase.bind(this)} />
                                </View>:<Button className={productListDialogStyle.put_shopping_cart_btn} onClick={this.increase.bind(this)}>加入购物车</Button>}
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}
module.exports = ProductListDialogView;
const selectedBg = {
    color:"#399cfe",
    border:"0.01rem solid #399cfe"
};