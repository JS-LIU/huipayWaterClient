import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
@inject (['addressList'])
@inject (['activeAddress'])
@observer class ReceiveAddressListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList();
    }
    choose(item){
        return ()=>{
            this.props.activeAddress.selectedDeliverAddress(item);
        }
    }
    removeAddress(item){
        return ()=>{
            console.log(item);
            this.props.addressList.remove(item);
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li className={receiveAddressListStyle.address_nodes} key={index}>
                    <Link to="/confirmOrder" onClick = {this.choose(item)}>
                        <View className={receiveAddressListStyle.receiver_info}>
                            <p >{item.name}</p >
                            <p className={receiveAddressListStyle.telephone}>{item.phoneNum}</p >
                            {item.addressTagName?<p className={receiveAddressListStyle.address_label}>{item.addressTagName}</p>:""}
                        </View>
                        <p className={receiveAddressListStyle.location}>
                            <Text>{item.address.cityName}</Text>
                            <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
                        </p >
                    </Link>
                    <Button className={receiveAddressListStyle.delete_address_btn} onClick={this.removeAddress(item)}>删除</Button>
                </li>
            )
        });
        return (
            <View className={receiveAddressListStyle.receive_address_list}>
                <ul className={receiveAddressListStyle.address_list}>
                    {addressNodes}
                </ul>
                <Link to="/confirmOrderCreateAddress"
                      className={receiveAddressListStyle.address_btn}>
                    <Text className={receiveAddressListStyle.address_btn_text}>新建地址</Text>
                </Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressListView;