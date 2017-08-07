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
import ShopRatingView from './ShopRatingView';
import ReceiveAddressView from './ReceiveAddressView';

import specificationStyle from '../css/specificationStyle.css';
import productSceneryStyle from '../css/productSceneryStyle.css';
import productInfoStyle from '../css/productInfoStyle.css';
import productBelongShopStyle from '../css/productBelongShopStyle.css';
import productDetailFooterStyle from '../css/productDetailFooterStyle.css';


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
            <View style={productDetailStyle}>
                <ReceiveAddressView />
                <View className={productSceneryStyle.product_scenery}>
                    <img src={this.props.productDetail.info.detailImages[0]} alt=""
                         className={productSceneryStyle.scenery_pic}/>
                </View>

                <View className={productInfoStyle.info_intro}>
                    <p className={productInfoStyle.brand_name}>
                        {this.props.productDetail.info.showProduct.productName}
                    </p>
                    <p className={productInfoStyle.sub_brand}>{this.props.productDetail.info.salesPromotionModel.content}!</p>
                    <p className={productInfoStyle.price}>
                        <span className={productInfoStyle.price_Unit}>￥</span>
                        <span className={productInfoStyle.price_num}>{this.props.productDetail.info.showProduct.showPrice}</span>
                        <span>原价：</span><span className={productInfoStyle.original_price}>￥26</span>
                        <span className={productInfoStyle.sale}>已售：{this.props.productDetail.info.showProduct.soldNumber}</span>
                    </p>
                </View>
                <View className={productInfoStyle.service}>
                    <View className={productInfoStyle.promote}>
                        <p className={productInfoStyle.promote_title}>服务：</p>
                        <span>{this.props.productDetail.info.serviceDesc}</span>
                    </View>
                    <View className={productInfoStyle.pledge}>
                        <p className={productInfoStyle.promote_title}>押金：</p>
                        <p className={productInfoStyle.service_describe}>{this.props.productDetail.info.depositDesc}</p>
                    </View>
                </View>

                <View className={productBelongShopStyle.water_store}>
                    <View className={productBelongShopStyle.store_basic}>
                        <img src={this.props.shopDetail.info.baseInfoModel.imageUrl} className={productBelongShopStyle.store_pic}/>
                        <View className={productBelongShopStyle.store_name}>
                            <p>{this.props.shopDetail.info.baseInfoModel.name}</p>
                            <View className={productBelongShopStyle.shop_rating_level}>
                                <ShopRatingView />
                                <p className={productBelongShopStyle.judge_num}>{this.props.shopDetail.info.baseInfoModel.starsNumber}</p>
                            </View>
                        </View>
                        <Link to={{pathname:'/shop',state:{shopInfo:this.props.shopDetail.info.baseInfoModel}}}>
                            <p className={productBelongShopStyle.enter_store_btn}>进入店铺</p>
                        </Link>
                    </View>
                </View>


                <View className={productDetailFooterStyle.product_detail_footer}>
                    <View className={productDetailFooterStyle.serve}>
                        <div className={productDetailFooterStyle.serve_mine}>我的</div>
                        <Link to="shoppingCart" className={productDetailFooterStyle.serve_cart}>
                            <span className={productDetailFooterStyle.cart_num}>
                                {this.props.shoppingCart.totalCount}
                            </span>
                            <p>购物车</p>
                        </Link>
                    </View>
                    <View className={productDetailFooterStyle.settle}>
                        <div className={productDetailFooterStyle.add_cart}>加入购物车</div>
                        <div onClick = {this.showSpec} className={productDetailFooterStyle.purchase}>立即购买</div>
                    </View>
                </View>
                <View className={this.props.productDetail.isShowSpec?specificationStyle.show_spec:specificationStyle.hide_spec}>
                    <View onClick = {this.closeSpec} className={specificationStyle.close}>x</View>
                    <ul className={specificationStyle.choose_num}>
                        <li className={specificationStyle.choose_num_operate}>
                            <span className={specificationStyle.operate_title}>选择数量</span>
                            <p className={specificationStyle.operate_num}>
                                <span className={specificationStyle.num_reduce}>-</span>
                                <span className={specificationStyle.product_num}>1</span>
                                <span className={specificationStyle.num_increase}>+</span>
                            </p>
                        </li>
                    </ul>
                    <Link to="/createOrder" onClick = {this.getSettleOrder} className={specificationStyle.sure}>确定</Link>
                </View>
            </View>
        )
    }
}

module.exports = ProductDetailView;

const productDetailStyle={
    background:'#EEEFF3',
    paddingBottom:'1rem'
};