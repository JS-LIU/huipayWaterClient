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
        return (
            <View >
                <Link to={{pathname: '/addressList', state: { last: "/shop" }}}
                      className={activeAddressStyle.headLocation}>
                    <span className={activeAddressStyle.profile}>收货地址：</span>
                    <div id="container" className={autoMapStyle.map_hide} />
                    <p className={activeAddressStyle.detail_address}>
                        {this.props.activeAddress.info.receiveAddress}
                    </p>
                </Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressView;
