/**
 * Created by LDQ on 2017/7/11.
 */

//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  components
import View from '../components/View';
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
            <View style={createorderStyle}>
                <ConfirmReceiveAddressView/>
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
        let shopNodes = this.props.order.settleInfo.list.map((shop,index)=>{
            let productNodes = shop.productList.map((product,index)=>{
                return (
                    <li className={createOrderStyle.product_nodes} key={index}>
                        <p className={createOrderStyle.product_pic_box}>
                            <img src={product.picUrl} alt="" className={createOrderStyle.product_pic}/>
                        </p>
                        <div className={createOrderStyle.product_detail}>
                            <p className={createOrderStyle.product_name}>{product.productName}resr</p>
                            <p className={createOrderStyle.product_volume}>{product.specification}</p>
                            <p className={createOrderStyle.product_price}>
                                ￥<span className={createOrderStyle.product_sale}>{product.price}</span> * {product.count}</p>
                        </div>
                    </li>
                )
            });

            return (
                <li key = {index} className={createOrderStyle.shop_nodes}>
                    <ul>
                        <li>
                            <ul>
                                {productNodes}
                            </ul>
                        </li>
                        <li className={createOrderStyle.charge}>
                            <span className={createOrderStyle.charge_title}>快递费用</span>
                            <span>{shop.expressFee}元</span>
                        </li>
                        <li className={createOrderStyle.charge}>
                            <span className={createOrderStyle.charge_title}>水票抵用</span>
                            <span className={createOrderStyle.purpose}>{shop.ticketPayCount}</span>
                        </li>
                        <li className={createOrderStyle.cost}>
                            <p className={createOrderStyle.cost_descript}>
                                <span>共{shop.shopTotalProductCount}件商品，</span>
                                <span>合计</span>
                                <span className={createOrderStyle.cost_unit}>￥</span>
                                <span className={createOrderStyle.const_money}>{shop.shopTotalPrice}</span>
                            </p>
                        </li>
                    </ul>
                </li>
            )
        });
        return (
            <ul className={createOrderStyle.shop_nodes_list}>
                {shopNodes}
            </ul>
        )
    }
}


@inject(['order'])
@observer class OrderFooterView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View className={createOrderStyle.confirm_footer}>
                <p className={createOrderStyle.statistics}>
                    <span>共{this.props.order.settleInfo.totalProductCount}件商品</span>
                    <span className={createOrderStyle.payable}>实付款￥</span>
                    <span>{this.props.order.settleInfo.totalPrice}</span>
                </p>
                <Link to="www.baidu.com" className={createOrderStyle.submit_order}>确认支付</Link>
            </View>
        )
    }
}


module.exports = CreateOrderView;
const createorderStyle={
    background:'#EEEFF3',
    minHeight:'13.33rem',
};