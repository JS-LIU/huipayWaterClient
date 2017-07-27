import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

import autoCompleteAddressStyle from '../css/autoCompleteAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['autoMap'])

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
            this.props.autoMap.searchAddressDetail(name);
            this.refs.addressName.value = name;
        }
    }
    render(){
        let addressNodes = this.props.autoMap.searchAddressList.map((item,index)=>{
            return (
                <li key={index}
                    className={autoCompleteAddressStyle.address_node}
                    onClick={this.choose(item.name)} >
                    <Link to="/inputAddress">
                        <p className={autoCompleteAddressStyle.consignee_address}>
                            {item.name}
                        </p>
                        <p className={autoCompleteAddressStyle.consignee_location}>
                            {item.district}
                        </p>
                    </Link>
                </li>
            )
        });
        return (
            <View className={autoCompleteAddressStyle.auto_complete_address}>
                <View className={autoCompleteAddressStyle.hand_input}>
                    <View className={autoCompleteAddressStyle.hand_input_address}>
                        <div className={autoCompleteAddressStyle.auto_city}>
                            <p className={autoCompleteAddressStyle.address_city}>{this.props.autoMap.city}</p>
                        </div>

                        <input type="text"
                               placeholder="输入搜索地址"
                               ref="addressName"
                               onKeyUp={this.searchAddress}
                               className={autoCompleteAddressStyle.address_input}/>
                    </View>
                </View>
                <ul>
                    {addressNodes}
                </ul>
            </View>
        )
    }
}
module.exports = AutoCompleteAddressView;