/**
 * Created by LDQ on 2017/9/19
 */

import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';
import Button from '../components/Button';
import InputAddressView from './InputAddressView';
import inputAddressStyle from '../css/inputAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['addressList'])
@inject (['customAddress'])
@inject (['autoMap'])
@observer class HomePageCreateAddressView extends Component{
    constructor(props){
        super(props);
    }
    createAddress(){
        let info = this.props.customAddress.info;
        let tagId = this.props.customAddress.tag.id;
        this.props.addressList.create(info,tagId,this.props.autoMap.showLocationInfo);
    }
    render(){
        return (
            <View className={inputAddressStyle.input_box}>
                <InputAddressView url={this.props.location.pathname}/>
                <Link to="/addressList" replace className={inputAddressStyle.save_new_address} onClick={this.createAddress.bind(this)}>保存</Link>
            </View>
        )
    }
}

module.exports = HomePageCreateAddressView;