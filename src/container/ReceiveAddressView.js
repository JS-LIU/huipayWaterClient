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

@inject (['location'])


@observer class ReceiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        return (
            <View >
                <Link to='/addressList'
                      className={activeAddressStyle.headLocation}>
                    <span className={activeAddressStyle.profile}>收货地址：</span>
                    <div id="container" className={autoMapStyle.map_hide} />
                    <p className={activeAddressStyle.detail_address}>
                        {this.props.location.homePageAddress.receiveAddress}
                    </p>
                </Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressView;
