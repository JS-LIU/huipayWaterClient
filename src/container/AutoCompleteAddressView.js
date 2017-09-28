import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import autoCompleteAddressStyle from '../css/autoCompleteAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

// @inject (['position'])
@inject (['autoComplete'])
@observer class AutoCompleteAddressView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        let url = this.props.history.location.pathname;
        this.props.autoComplete.setStore(url);
        this.props.autoComplete.searchAddressList(this.props.autoComplete.currentAddress.receiveAddress);
    }
    searchAddress(){
        this.props.autoComplete.searchAddressList(this.refs.addressName.value);
    }
    choose(name){
        return ()=>{
            this.props.autoComplete.hideAutoCompleteList();
            this.props.autoComplete.choose(name);
            this.props.history.goBack();
        }
    }
    cancel(){
        this.refs.addressName.value = "";
        this.props.autoComplete.hideAutoCompleteList();
        this.props.history.goBack();
    }
    show(){
        this.props.autoComplete.showAutoCompleteList();
    }
    render(){
        let addressNodes = this.props.autoComplete.autoCompleteList.map((item,index)=>{
            return (
                <li key={index}
                    className={autoCompleteAddressStyle.address_node}
                    onClick={this.choose(item.receiveAddress)} >
                    <View>
                        <Text className={autoCompleteAddressStyle.consignee_address}>
                            {item.receiveAddress}
                        </Text>
                        <Text className={autoCompleteAddressStyle.consignee_location}>
                            {item.district}
                        </Text>
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
                           onKeyUp={this.searchAddress.bind(this)}
                           className={autoCompleteAddressStyle.address_input} onFocus={this.show.bind(this)}/>
                    <Button className={autoCompleteAddressStyle.cancel} onClick={this.cancel.bind(this)}>取消</Button>
                </View>
                {this.props.autoComplete.isShowAutoCompleteList?<ul>
                    {addressNodes}
                </ul>:""}
            </View>
        )
    }
}
module.exports = AutoCompleteAddressView;