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

@inject (['addressList'])
@observer class CreateOrEditAddressView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shopInfo.getShopInfo(1);
    }
    render(){
        return (
            <View className={createOrEditStyle.wrap}>
                <InputAddressView />
                <Button className={createOrEditStyle.save_btn}>保存</Button>
            </View>

        )
    }
}

module.exports = CreateOrEditAddressView;