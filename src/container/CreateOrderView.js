/**
 * Created by LDQ on 2017/7/11.
 */

//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  components
import View from '../components/View';
import ConfirmReceiveAddressView from './ConfirmReceiveAddressView';

//  MobX
import {observer,inject} from 'mobx-react';



@observer class CreateOrderView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
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
                    <li key={index}>
                        <img src={product.picUrl} alt=""/>
                        <p>{product.productName}</p>
                        <p>{product.specification}</p>
                        <p>￥{product.price} * {product.count}</p>
                    </li>
                )
            });

            return (
                <li key = {index}>
                    <ul>
                        <li>
                            <ul>
                                {productNodes}
                            </ul>
                        </li>
                        <li>
                            <span>快递费用</span>
                            <span>{shop.expressFee}</span>
                        </li>
                        <li>
                            <span>水票抵用</span>
                            <span>{shop.ticketPayCount}</span>
                        </li>
                        <li>
                            <span>共</span>
                            <span>{shop.shopTotalProductCount}</span>
                            <span>件商品，</span>
                            <span>合计</span>
                            <span>{shop.shopTotalPrice}</span>
                        </li>
                    </ul>
                </li>
            )
        });
        return (
            <ul>
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
            <View>
                <span>共</span>
                <span>{this.props.order.settleInfo.totalProductCount}</span>
                <span>件商品</span>
                <span>实付款￥</span>
                <span>{this.props.order.settleInfo.totalPrice}</span>
                <Link to="www.baidu.com">确认支付</Link>
            </View>
        )
    }
}


module.exports = CreateOrderView;