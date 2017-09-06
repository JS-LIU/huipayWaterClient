/**
 * Created by LDQ on 2017/9/6
 */


//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import View from '../components/View';
import Text from '../components/Text';

import shopInfoStyle from '../css/shopInfoStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';
@inject(['shopInfo'])


class HeadShopInfoView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shopInfo.getShopInfo(1);
    }
    render(){
        return (
            <View className={shopInfoStyle.total_height}>
                <ul className={shopInfoStyle.head_bj}>
                    <li>
                        <View className={shopInfoStyle.protect_img}>
                            <img src={this.props.shopInfo.info.imageUrl} alt="" className={shopInfoStyle.img}/>
                        </View>
                    </li>
                    <li className={shopInfoStyle.shop_detail_info}>
                        <Text className={shopInfoStyle.shop_name}>{this.props.shopInfo.info.name}</Text>
                        <Text>{this.props.shopInfo.info.address}</Text>
                    </li>
                    <li className={shopInfoStyle.shop_detail_distance}>
                        <Text className={shopInfoStyle.shop_distance}>{this.props.shopInfo.info.distance}</Text>
                        <Text className={shopInfoStyle.shop_delivery_time}>{this.props.shopInfo.info.deliveryTime}</Text>
                    </li>
                </ul>
            </View>

        )
    }
}

module.exports = HeadShopInfoView;