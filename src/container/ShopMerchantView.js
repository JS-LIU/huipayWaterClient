/**
 * Created by zhangq on 2017/7/18.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import shopMerchantStyle from '../css/shopMerchantStyle.css'

@inject (['shopDetail'])

@observer class ShopMerchantView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View className={shopMerchantStyle.shop_merchant}>
                <div className={shopMerchantStyle.merchant_intro}>
                    商家简介：
                </div>
                <div>
                    <p className={shopMerchantStyle.merchant_info}>
                        我公司是最早从事桶装水经营的公司之一，现有职工20多人，
                    现有连锁门店10多家。我们的精英总是：客户至上、用心服务、客户至上、用心服务，
                    您的健康是我们最大的希望。
                    </p>
                    <p className={shopMerchantStyle.pull_down}></p>
                </div>
            </View>
        )
    }
}
module.exports = ShopMerchantView;