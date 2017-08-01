/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import {Link} from 'react-router-dom';
import specificationStyle from '../css/specificationStyle.css';


@inject(['shoppingCart'])
@inject(['productDetail'])
@inject(['shopDetail'])
@inject(['order'])

@observer class ProductDetailView extends Component{
    constructor(props){
        super(props);
        this.showSpec = this.showSpec.bind(this);
        this.closeSpec = this.closeSpec.bind(this);
        this.getSettleOrder = this.getSettleOrder.bind(this);
    }
    componentWillMount(){
        let productInfo = this.props.location.state.productInfo;
        this.props.productDetail.getInfo(productInfo);
    }
    addShoppingCart(item){
        return ()=>{
            this.props.shoppingCart.put(item);
        }
    }
    showSpec(){
        this.props.productDetail.showSpecOperator();
    }
    closeSpec(){
        this.props.productDetail.closeSpecOperator();
    }
    getSettleOrder(){
        this.props.order.getSettleOrder(this.props.productDetail.info)
    }
    render(){
        return (
            <View>
                <img src={this.props.productDetail.info.detailImages[0]} alt=""/>
                <p>{this.props.productDetail.info.showProduct.productName}</p>
                <p>{this.props.productDetail.info.salesPromotionModel.content}</p>
                <p>{this.props.productDetail.info.showProduct.showPrice}</p>
                <p>
                    <span>已售</span>
                    <span>{this.props.productDetail.info.showProduct.soldNumber}</span>
                </p>

                <ul>
                    <li>
                        <span>服务：</span>
                        <span>{this.props.productDetail.info.serviceDesc}</span>
                    </li>
                    <li>
                        <span>押金：</span>
                        <span>{this.props.productDetail.info.depositDesc}</span>
                    </li>
                </ul>

                <View>
                    <img src={this.props.shopDetail.info.baseInfoModel.imageUrl} alt=""/>
                    <span>{this.props.shopDetail.info.baseInfoModel.name}</span>
                    <span>{this.props.shopDetail.info.baseInfoModel.starsNumber}</span>
                    <Link to={{pathname:'/shop',state:{shopInfo:this.props.shopDetail.info.baseInfoModel}}}>进入店铺</Link>
                </View>

                <View>
                    <span>加入购物车</span>
                    <span onClick = {this.showSpec}>立即购买</span>
                </View>
                <div className={this.props.productDetail.isShowSpec?specificationStyle.show_spec:specificationStyle.hide_spec}>
                    <View onClick = {this.closeSpec}>close</View>
                    <ul>
                        <li>
                            <span>选择数量</span>
                            <span>1</span>
                        </li>
                    </ul>
                    <Link to="/createOrder" onClick = {this.getSettleOrder}>确定</Link>
                </div>

            </View>
        )
    }
}

module.exports = ProductDetailView;