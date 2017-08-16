/**
 * Created by LDQ on 2017/7/14.
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import {Button} from '../components/Button';

import myStyle from '../css/myStyle.css';

class MyView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        return (
            <View>
                <OrderType />
            </View>
        )
    }
}

class OrderType extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        return (
            <View>
                <View className={myStyle.order_list}>
                    <View className={myStyle.order_list_header}>
                        <span className={myStyle.order_list_header_order_text}>我的订单</span>
                        <Link className={myStyle.order_list_header_more} to="/allOrder">查看全部</Link>
                    </View>
                    <ul className={myStyle.order_types}>
                        <li className={myStyle.wait_pay}>
                            <Link to="/waitPay" className={myStyle.wait_pay_icon} >待付款</Link>
                        </li>
                        <li>
                            <Link to="/waitPay">待付款</Link>
                        </li>
                        <li>
                            <Link to="/waitPay">待付款</Link>
                        </li>
                    </ul>
                </View>
                <ul>
                    <li>
                        <Link to="/waterTickets">水票</Link>
                    </li>
                    <li>
                        <Link to="/receiveAddressList">收货地址</Link>
                    </li>
                </ul>
            </View>
        )
    }
}


module.exports = MyView;