/**
 * Created by LDQ on 2017/9/30
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';

import InputAddressView from './InputAddressView';
import createOrEditStyle from '../css/createOrEditStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';

@inject(['customAddress'])
@inject(['addressList'])
@observer class CreateOrEditAddressView extends Component{
    constructor(props){
        super(props);
    }
    saveAddress(){
        let customAddress = this.props.customAddress;
        this.props.addressList.create(customAddress.userInfo,customAddress.tagId,customAddress.addressInfo);
        this.props.history.goBack();
    }
    render(){
        return (
            <View className={createOrEditStyle.wrap}>
                <InputAddressView />
                {
                    this.props.customAddress.canSave?
                    <Button className={createOrEditStyle.save_btn} onClick={this.saveAddress.bind(this)}>保存</Button>:
                    <View className={createOrEditStyle.cant_save_btn}>保存</View>
                }
            </View>

        )
    }
}

module.exports = CreateOrEditAddressView;