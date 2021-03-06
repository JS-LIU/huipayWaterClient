/**
 * Created by LDQ on 2017/9/26
 */
import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import {Link} from 'react-router-dom';

import ReceiveAddressListView from './ReceiveAddressListView';
import receiverListStyle from '../css/receiverListStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['addressList'])
@inject (['customAddress'])
@observer class ReceiverListView extends Component{
    constructor(props){
        super(props);
    }
    setOperateStrategy(){
        this.props.addressList.setOperateStrategy('create');
        this.props.customAddress.clearSet();
    }
    render(){
        return (
            <View className={receiverListStyle.wrap}>
                <ReceiveAddressListView history={this.props.history}/>
                <View className={receiverListStyle.footer}>
                    <Link to="/createOrEditAddress"
                          className={receiverListStyle.create_btn} onClick={this.setOperateStrategy.bind(this)}>添加地址</Link>
                </View>
            </View>
        )
    }
}
module.exports = ReceiverListView;