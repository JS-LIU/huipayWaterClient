import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
@inject (['addressList'])
@inject (['location'])
@observer class ReceiveAddressListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList();
    }
    choose(item){
        return ()=>{
            this.props.history.goBack();
            this.props.location.selectedHomeAddress(item);
        }
    }
    removeAddress(item){
        return ()=>{
            this.props.addressList.remove(item);
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li className={receiveAddressListStyle.address_nodes}
                    key={index}
                    onClick={this.choose(item)}>
                    <View className={receiveAddressListStyle.receiver_info}>
                        {item.addressTagName?<Text className={receiveAddressListStyle.address_label}>{item.addressTagName}</Text>:""}
                        <Text>{item.name}</Text>
                        <Text className={receiveAddressListStyle.telephone}>{item.phoneNum}</Text >
                    </View>
                    <Text className={receiveAddressListStyle.location}>
                        <Text>{item.address.cityName}</Text>
                        <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
                    </Text>
                </li>
            )
        });
        return (
            <ul className={receiveAddressListStyle.address_list}>
                {addressNodes}
            </ul>
        )
    }
}
module.exports = ReceiveAddressListView;