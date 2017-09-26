import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import autoCompleteAddressStyle from '../css/autoCompleteAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['autoMap'])
@inject (['location'])
@observer class AutoCompleteAddressView extends Component{
    constructor(props){
        super(props);
        this.searchAddress = this.searchAddress.bind(this);
    }
    searchAddress(){
        this.props.autoMap.autoComplete(this.refs.addressName.value);
    }
    choose(name){
        return ()=>{
            this.props.autoMap.hideNearAddressList();
            this.props.history.goBack();
            this.props.location.selectedHomeAddress(name);
        }
    }
    cancel(){
        this.props.autoMap.searchAddressDetail("");
        this.refs.addressName.value = "";
        this.props.autoMap.hideNearAddressList();
    }
    show(){
        this.props.autoMap.showNearAddressList();
    }
    render(){
        let addressNodes = this.props.autoMap.searchAddressList.map((item,index)=>{
            return (
                <li key={index}
                    className={autoCompleteAddressStyle.address_node}
                    onClick={this.choose(item.receiveName)} >
                    <View>
                        <p className={autoCompleteAddressStyle.consignee_address}>
                            {item.receiveName}
                        </p>
                        <p className={autoCompleteAddressStyle.consignee_location}>
                            {item.district}
                        </p>
                    </View>
                </li>
            )
        });
        return (
            <View className={autoCompleteAddressStyle.auto_complete_address}>
                <View className={autoCompleteAddressStyle.head_input}>
                    <input type="text"
                           placeholder="输入搜索地址"
                           ref="addressName"
                           onKeyUp={this.searchAddress}
                           className={autoCompleteAddressStyle.address_input} onFocus={this.show.bind(this)}/>
                    <Button className={autoCompleteAddressStyle.cancel} onClick={this.cancel.bind(this)}>取消</Button>
                </View>
                {this.props.autoMap.showAddressList?<ul>
                    {addressNodes}
                </ul>:""}
            </View>
        )
    }
}
module.exports = AutoCompleteAddressView;