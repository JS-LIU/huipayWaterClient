/**
 * Created by LDQ on 2017/7/11.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';

import autoMapStyle from '../css/autoMapStyle.css';
import activeAddressStyle from '../css/activeAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['position'])

/**
 * 首页头部的 【收货地址】
 */
@observer class ReceiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View >
                <Link to='/addressList'
                      className={activeAddressStyle.head_location}>
                    <span className={activeAddressStyle.location_icon} />
                    <p className={activeAddressStyle.detail_address}>
                        {this.props.position.homePageAddress.fullAddress}
                    </p>
                </Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressView;
