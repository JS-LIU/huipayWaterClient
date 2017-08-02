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

@inject (['activeAddress'])

@observer class ReceiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let currentUrl = this.props.current;
        return (
            <View className={activeAddressStyle.headLocation}>
                <Link to={{pathname:'/receiveAddressList',state:{from:currentUrl}}}>
                    <span className={activeAddressStyle.profile}>收货地址：</span>
                    <div id="container" className={autoMapStyle.map_hide} />
                    <span className={activeAddressStyle.detail_address}>
                        {this.props.activeAddress.address.info.receiveAddress}
                    </span>
                </Link>
            </View>

        )
    }
}
module.exports = ReceiveAddressView;