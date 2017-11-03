/**
 * Created by LDQ on 2017/10/30
 */

import React, {Component} from 'react';

import {observer,inject} from 'mobx-react';
import View from '../components/View';
import Text from '../components/Text';
import payWayStyle from '../css/payWayStyle.css';

@inject(['order'])
@observer class PayWayView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View className={payWayStyle.wrap}>
                <View className={payWayStyle.pay_box}>
                    <Text className={payWayStyle.pay_way_price_title}>实付金额</Text>
                    <Text className={payWayStyle.pay_way_price}>￥{this.props.order.totalPrice / 100}</Text>
                </View>
                <View className={payWayStyle.pay_way_title}>选择支付方式</View>
                <View className={payWayStyle.pay_way_wx}>
                    <View className={payWayStyle.pay_way_wx_box}>
                        <Text className={payWayStyle.pay_way_pay_title}>微信支付</Text>
                        <Text className={payWayStyle.pay_way_pay_zs}>由于微信单方面原因，在微信环境下只能使用微信支付</Text>
                    </View>

                </View>

                <a href="http://www.huipay.com:9931/huibeiwater/huipayWaterClientWap/payWay.html" className={payWayStyle.pay_btn}>
                    支付
                </a>
            </View>
        )
    }
}

module.exports = PayWayView;