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
import autoCompleteAddressStyle from '../css/autoCompleteAddressStyle.css';
import {observer,inject} from 'mobx-react';

@observer class AddressListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View className={addressListStyle.wrap}>
                <AutoCompleteAddressView history={this.props.history}/>
                <View className={addressListStyle.address_title}>当前地址</View>
                <CurrentAddress history={this.props.history}/>
                <View className={addressListStyle.receive_address_title}>
                    <Text className={addressListStyle.address_title}>收货地址</Text>
                    <Link to='/inputAddress'
                          className={addressListStyle.create_btn}>新建地址</Link>
                </View>
                <ReceiveAddressListView history={this.props.history}/>
                <View className={addressListStyle.address_title}>附近地址</View>
                <NearAddress history={this.props.history}/>
            </View>
        )
    }
}

@inject (['position'])
@observer class CurrentAddress extends Component{
    constructor(props){
        super(props);
    }
    resetCurrentAddress(){
        this.props.position.getCurrentMap();
    }
    choose(){
        this.props.history.goBack();
        this.props.position.selectedHomeAddress(this.props.position.current);
    }
    render(){
        return (
            <View className={addressListStyle.current_address}>
                <Button
                    className={addressListStyle.current_address_info}
                    onClick={this.choose.bind(this)}>{this.props.position.current.receiveAddress}</Button>
                <Button className={addressListStyle.current_address_reset} onClick={this.resetCurrentAddress.bind(this)}>重新定位</Button>
            </View>
        )
    }
}

@inject (['position'])
@observer class NearAddress extends Component{
    constructor(props){
        super(props);
    }
    choose(item){
        return ()=>{
            this.props.position.selected(item);
            this.props.history.goBack();
        }
    }
    render(){
        let nearAddressNodes = this.props.position.nearAddressList.map((item,index)=>{
            return (
                <li key={index}
                    className={autoCompleteAddressStyle.address_node}
                    onClick={this.choose(item)} >
                    <View>
                        <Text className={autoCompleteAddressStyle.consignee_address}>
                            {item.receiveAddress}
                        </Text>
                    </View>
                </li>
            )
        });
        return (
            <ul>
                {nearAddressNodes}
            </ul>
        )
    }
}



module.exports = AddressListView;