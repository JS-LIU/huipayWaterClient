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
                    <Text className={createOrderStyle.pay_way_online}>在线支付</Text>
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
    reduce(productItem){
        return ()=>{
            productItem.reduce();
        }
    }
    increase(productItem){
        return ()=>{
            productItem.increase();
        }
    }
    render(){
        let productNodes = this.props.order.productList.map((productItem,index)=>{
            return (
                <li className={createOrderStyle.product_nodes} key={index}>
                    <View className={createOrderStyle.product_pic_box}>
                        <img src={productItem.productImage[0]} alt="" className={createOrderStyle.product_pic}/>
                    </View>
                    <View className={createOrderStyle.product_detail}>
                        <Text className={createOrderStyle.product_name}>{productItem.name}</Text>
                        <View className={createOrderStyle.product_price}>
                            <Text className={createOrderStyle.product_price_title}>￥</Text>
                            <Text className={createOrderStyle.price}>{productItem.currentPrice / 100}</Text>
                            <Text className={createOrderStyle.count}>* {productItem.selectCount}</Text>
                        </View>
                    </View>
                    {productItem.isCanOperate?<View className={createOrderStyle.product_item_ctrl}>
                        {productItem.selectCount > 1?<Button className={createOrderStyle.product_reduce} onClick={this.reduce(productItem)} />:""}
                        <Text className={createOrderStyle.product_count}>{productItem.selectCount}</Text>
                        <Button className={createOrderStyle.product_increase} onClick={this.increase(productItem)} />
                    </View>:""}
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
                <Link to="/useWaterTickets"
                      className={createOrderStyle.water_ticket_list}>
                    <Text className={createOrderStyle.water_ticket_title}>水票抵用</Text>
                    <Text className={createOrderStyle.water_ticket_used}>-{this.props.order.orderTicket.totalUsedTicket}张</Text>
                </Link>
            </View>

        )
    }
}


@inject(['order'])
@inject(['addressList'])
@observer class OrderFooterView extends Component{
    constructor(props){
        super(props);
    }
    createOrder(){
        this.props.order.createOrderId(this.props.addressList.activeAddress.id);
    }
    render(){
        return (
            <View className={createOrderStyle.confirm_footer}>
                <View className={createOrderStyle.statistics}>
                    <Text>共{this.props.order.totalCount}件商品</Text>
                    <Text className={createOrderStyle.pay_title}>实付款</Text>
                    <Text className={createOrderStyle.total_price}>￥{this.props.order.totalPayMount / 100}</Text>
                </View>
                {this.props.addressList.activeAddress?
                    <Link to={this.props.totalPrice === 0?"/paySuccess":"/payWay"}
                          replace
                          className={createOrderStyle.submit_order}
                          onClick={this.createOrder.bind(this)}>
                        <Text className={createOrderStyle.pay}>立即下单</Text>
                    </Link>:<Button className={createOrderStyle.cant_submit_order}>
                        <Text className={createOrderStyle.pay}>立即下单</Text>
                    </Button>}

            </View>
        )
    }
}


module.exports = CreateOrderView;