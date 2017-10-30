/**
 * Created by LDQ on 2017/9/21
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';

import orderListStyle from '../css/orderListStyle.css';


import {observer,inject} from 'mobx-react';

@inject (['orderList'])
@observer class OrderListView extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.props.orderList.getOrderList('全部');
    }
    refreshOrderList(typeName){
        return ()=>{
            this.props.orderList.cutTag(typeName);
            this.props.orderList.getOrderList(typeName);
        }
    }
    render(){
        let orderShopNodes = this.props.orderList.list.map((shopItem,index)=>{
            let OrderProductNodes = shopItem.productItemModels.map((productItem,index)=>{
                 return (
                     <li key={index} className={orderListStyle.order_product_item}>
                         <View className={orderListStyle.order_product_img_protect}>
                             <img src={productItem.productImage[index]} alt="" className={orderListStyle.order_product_img}/>
                         </View>
                         <View className={orderListStyle.order_product_info}>
                             <Text className={orderListStyle.order_product_name}>{productItem.name}</Text>
                             <View className={orderListStyle.order_product_price_info}>
                                 <Text className={orderListStyle.order_product_price_unit}>￥</Text>
                                 <Text className={orderListStyle.order_product_price}>{productItem.currentPrice / 100}</Text>
                                 <Text  className={orderListStyle.order_product_count}> * {productItem.selectCount}</Text>
                             </View>
                         </View>
                     </li>
                 )
            });
            return (
                <li key={index} className={orderListStyle.order_shop_item}>
                    <View className={orderListStyle.order_shop_title}>
                        <Text className={orderListStyle.order_shop_title_text}>{shopItem.shopName}</Text>
                        <Text className={orderListStyle.order_shop_type}>{shopItem.status}</Text>
                    </View>
                    <ul>
                        {OrderProductNodes}
                    </ul>
                    <View className={orderListStyle.order_shop_total_info}>
                        <Text className={orderListStyle.order_shop_total_count}>共{shopItem.totalCount}件商品，实付：</Text>
                        <Text className={orderListStyle.order_shop_total_unit}>￥</Text>
                        <Text className={orderListStyle.order_shop_total_price}>{shopItem.totalPayRmb / 100}</Text>
                    </View>

                </li>
            )
        });
        let tagNodes = this.props.orderList.tagList.map((tagItem,index)=>{
            return (
                <li key={index}
                    className={orderListStyle.header_text}
                    onClick={this.refreshOrderList(tagItem.name)}
                    style={tagItem.selected?selectedTag:{}}>
                    {tagItem.name}
                </li>
            )
        });
        return (
            <View className={orderListStyle.wrap}>
                <ul className={orderListStyle.header}>
                    {tagNodes}
                </ul>
                <ul className={orderListStyle.order_shop_list}>
                    {orderShopNodes}
                </ul>
            </View>
        )
    }
}
module.exports = OrderListView;
const selectedTag = {
    color:"#399cfe",
    borderBottom:"0.04rem solid #399cfe"
};

