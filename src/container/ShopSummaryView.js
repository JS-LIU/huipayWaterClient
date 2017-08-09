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
            <Link to="shopDetail" className={shopSummaryStyle.water_shop}>
                <View className={shopSummaryStyle.shop_pic_protector}>
                    <img src={this.props.shopDetail.info.baseInfoModel.imageUrl} className={shopSummaryStyle.shop_pic}/>
                </View>

                <ul className={shopSummaryStyle.shop_info}>
                    <li className={shopSummaryStyle.shop_name}>
                        {this.props.shopDetail.info.baseInfoModel.name}
                    </li >
                    <li className={shopSummaryStyle.shop_sale_info}>
                        <ShopRatingView />
                        <span className={shopSummaryStyle.sale_num}>
                            <span>月售：</span>
                            <span>{this.props.shopDetail.info.baseInfoModel.soldNumber}</span>
                        </span >
                    </li>
                    <li className={shopSummaryStyle.address_info}>
                        <p className={shopSummaryStyle.shop_address}>{this.props.shopDetail.info.baseInfoModel.address}</p >
                        <p className={shopSummaryStyle.shop_distance}>{this.props.shopDetail.info.baseInfoModel.distance}km</p >
                    </li>
                </ul>
            </Link>
        )
    }
}
module.exports = ShopSummaryView;