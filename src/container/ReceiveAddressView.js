/**
 * Created by LDQ on 2017/7/11.
 */
import React, {Component} from 'react';
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
        return (
            <View className={activeAddressStyle.headLocation}>
                <span className={activeAddressStyle.profile}>收货地址：</span>
                <div id="container" className={autoMapStyle.map_hide} />
                <span className={activeAddressStyle.detail_address}>{this.props.activeAddress.activityLocation.township}
                    {this.props.activeAddress.activityLocation.street}
                    {this.props.activeAddress.activityLocation.streetNumber}
                </span>
            </View>

        )
    }
}
module.exports = ReceiveAddressView;