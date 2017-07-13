/**
 * Created by LDQ on 2017/7/11.
 */
import React, {Component} from 'react';
import View from '../components/View';

import autoMapStyle from '../css/autoMapStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';

@inject (['activeAddress'])


@observer class ReceiveAddress extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.activeAddress.getActivityLocation();
    }
    render(){
        return (
            <View>
                <span>地址：</span>
                <div id="container" className={autoMapStyle.map_hide} />
                <span>{this.props.activeAddress.currentAddressInfo.province}</span>
            </View>
        )
    }
}
module.exports = ReceiveAddress;