/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';
import ShopRatingView from './ShopRatingView';

//  MobX
import {observer,inject} from 'mobx-react';

import shopSummaryStyle from '../css/shopSummaryStyle.css';

@inject(['shopDetail'])

@observer class ShopSummaryView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Link to="shopDetail" className={shopSummaryStyle.waterStore}>
                <img src={this.props.shopDetail.info.baseInfoModel.imageUrl} className={shopSummaryStyle.storePic}/>
                <View className={shopSummaryStyle.storeName}>
                    <p className={shopSummaryStyle.shop_name}>{this.props.shopDetail.info.baseInfoModel.name}</p >
                    <View className={shopSummaryStyle.month_sale}>
                        <ShopRatingView />
                        <p className={shopSummaryStyle.sale_num}>
                            <span>月售：</span>
                            <span>{this.props.shopDetail.info.baseInfoModel.soldNumber}</span>
                        </p >
                    </View>
                    <View className={shopSummaryStyle.location}>
                        <p className={shopSummaryStyle.shop_address}>{this.props.shopDetail.info.baseInfoModel.address}</p >
                        <p className={shopSummaryStyle.shop_distance}>{this.props.shopDetail.info.baseInfoModel.distance}km</p >
                    </View>
                </View>
            </Link>
        )
    }
}
module.exports = ShopSummaryView;