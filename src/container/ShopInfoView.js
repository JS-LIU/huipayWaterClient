/**
 * Created by zhangq on 2017/7/18.
 */

//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShopRatingView from './ShopRatingView';
import shopInfoStyle from '../css/shopInfoStyle.css'


@inject (['shopDetail'])

@observer class ShopInfoView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ul className={shopInfoStyle.shop_abstract}>
                    <li className={shopInfoStyle.info_name}>
                        {this.props.shopDetail.info.baseInfoModel.name}
                    </li>
                    <li className={shopInfoStyle.info_grade}>
                        <ShopRatingView />
                        <span className={shopInfoStyle.info_mark}>8.0分</span>
                    </li>
                </ul>

                <ul className={shopInfoStyle.shop_specific}>
                    <li className={shopInfoStyle.spec_code}>
                        <p className={shopInfoStyle.code_left}>店铺二维码</p>
                    </li>
                    <li className={shopInfoStyle.spec_address}>
                        <p className={shopInfoStyle.address_left}>
                            {this.props.shopDetail.info.baseInfoModel.address}
                        </p>
                        <p className={shopInfoStyle.address_distance}>
                            {this.props.shopDetail.info.baseInfoModel.distance}km
                        </p>
                    </li>
                    <li className={shopInfoStyle.spec_contact}>
                        <p className={shopInfoStyle.contact_phone}>
                            {this.props.shopDetail.info.baseInfoModel.telephoneNumber}
                        </p>
                    </li>
                </ul>

                <ul className={shopInfoStyle.shop_distribute}>
                    <li className={shopInfoStyle.distribute_time}>
                        {this.props.shopDetail.info.distributionTime}
                    </li>
                    <li className={shopInfoStyle.distribute_scope}>
                        {this.props.shopDetail.info.distributionScope}
                    </li>
                </ul>
            </View>
        )
    }
}

module.exports = ShopInfoView;