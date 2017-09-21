/**
 * Created by LDQ on 2017/7/11.
 */

//  react
import React, {Component} from 'react';

import {Link} from 'react-router-dom';

//  components
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import ConfirmReceiveAddressView from './ConfirmReceiveAddressView';

import createOrderStyle from '../css/createOrderStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';

@observer class CreateOrderView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View className={createOrderStyle.wrap}>
                <ConfirmReceiveAddressView/>
                <View className={createOrderStyle.pay_way}>
                    <Text className={createOrderStyle.pay_way_title}>支付方式</Text>
                    <Text className={createOrderStyle.pay_way_selected}>货到付款</Text>
                </View>
                <OrderListView/>
                <OrderFooterView/>
            </View>
        )
    }
}

@inject(['order'])
@observer class OrderListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let productNodes = this.props.order.orderInfo.productItemModels.map((productItem,index)=>{
            return (
                <li className={createOrderStyle.product_nodes} key={index}>
                    <View className={createOrderStyle.product_pic_box}>
                        <img src={productItem.productImage} alt="" className={createOrderStyle.product_pic}/>
                    </View>
                    <View className={createOrderStyle.product_detail}>
                        <Text className={createOrderStyle.product_name}>{productItem.name}</Text>
                        <View className={createOrderStyle.product_price}>
                            <Text className={createOrderStyle.product_price_title}>￥</Text>
                            <Text className={createOrderStyle.price}>{productItem.currentPrice / 100}</Text>
                            <Text className={createOrderStyle.count}>* {productItem.selectCount}</Text>
                        </View>
                    </View>
                </li>
            )
        });

        return (
            <View className={createOrderStyle.order}>
                <View className={createOrderStyle.shop_name}>
                    <Text className={createOrderStyle.name}>{this.props.order.shopName}</Text>
                </View>

                <ul className={createOrderStyle.shop_nodes_list}>
                    {productNodes}
                </ul>
                <View className={createOrderStyle.water_ticket_list}>
                    <Text className={createOrderStyle.water_ticket_title}>水票抵用</Text>
                    <Text className={createOrderStyle.water_ticket_used}>{this.props.order.totalUsedTicket}张</Text>
                </View>
            </View>

        )
    }
}


@inject(['order'])
@inject(['activeAddress'])
@observer class OrderFooterView extends Component{
    constructor(props){
        super(props);
    }
    createOrder(){
        this.props.order.createOrderId(this.props.activeAddress.deliverAddress.id,"",1);
    }
    render(){
        return (
            <View className={createOrderStyle.confirm_footer}>
                <View className={createOrderStyle.statistics}>
                    <Text>共{this.props.order.orderInfo.totalCount}件商品</Text>
                    <Text className={createOrderStyle.pay_title}>实付款</Text>
                    <Text className={createOrderStyle.total_price}>￥{this.props.order.orderInfo.totalPayMount / 100}</Text>
                </View>
                {this.props.activeAddress.deliverAddress?<Link to="/paySuccess" replace className={createOrderStyle.submit_order} onClick={this.createOrder.bind(this)}>
                    <Text className={createOrderStyle.pay}>立即下单</Text>
                </Link>:<Button className={createOrderStyle.cant_submit_order}>
                    <Text className={createOrderStyle.pay}>立即下单</Text>
                </Button>}

            </View>
        )
    }
}


module.exports = CreateOrderView;