/**
 * Created by LDQ on 2017/9/20
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';

import paySuccessStyle from '../css/paySuceessStyle.css';

import {observer,inject} from 'mobx-react';

@inject(['order'])
@observer class PaySuccessView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.order);
        return (
            <View className={paySuccessStyle.wrap}>
                <View className={paySuccessStyle.pay_success}>
                    <Text className={paySuccessStyle.pay_success_text}>下单成功,等待配送中...</Text>
                </View>
                <ul className={paySuccessStyle.order_info}>
                    <li className={paySuccessStyle.order_item}>交易单号：{this.props.order.info.orderNo}</li>
                    <li className={paySuccessStyle.order_item}>支付金额：{this.props.order.info.totalPrice / 100}元</li>
                    <li className={paySuccessStyle.order_item}>支付方式：在线支付</li>
                </ul>
                <Link to="/shop" replace className={paySuccessStyle.order_back}>返回首页</Link>
            </View>
        )
    }
}

module.exports = PaySuccessView;