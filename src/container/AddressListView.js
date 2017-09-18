/**
 * Created by LDQ on 2017/9/17
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import AutoCompleteAddressView from './AutoCompleteAddressView';
import ReceiveAddressListView from './ReceiveAddressListView';
import addressListStyle from '../css/addressListStyle.css';

import {observer,inject} from 'mobx-react';

@observer class AddressListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View className={addressListStyle.wrap}>
                <AutoCompleteAddressView url={this.props.location.state.last}/>

                <View className={addressListStyle.address_title}>当前地址</View>
                <CurrentAddress />
                <View className={addressListStyle.receive_address_title}>
                    <Text className={addressListStyle.address_title}>收货地址</Text>
                    <Link to={{pathname:'/inputAddress',state:{action:'create'}}}
                          className={addressListStyle.create_btn}>新建地址</Link>
                </View>
                <ReceiveAddressListView />
            </View>
        )
    }
}

@inject (['activeAddress'])
@observer class CurrentAddress extends Component{
    constructor(props){
        super(props);
    }
    resetCurrentAddress(){
        this.props.activeAddress.getCurrentAddress();
    }
    choose(){
        this.props.activeAddress.selectedCurrentAddress(this.props.activeAddress.current)
    }
    render(){
        return (
            <View className={addressListStyle.current_address}>
                <Link to='/shop' className={addressListStyle.current_address_info} onClick={this.choose.bind(this)}>{this.props.activeAddress.current.receiveAddress}</Link>
                <Button className={addressListStyle.current_address_reset} onClick={this.resetCurrentAddress.bind(this)}>重新定位</Button>
            </View>
        )
    }

}

module.exports = AddressListView;