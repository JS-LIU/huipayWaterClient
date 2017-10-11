import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import SlideOperateView from '../components/SlideOperateView';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
@inject (['addressList'])
@inject (['position'])

/**
 * 收货地址列表
 */
@observer class ReceiveAddressListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList();
    }
    choose(item){
        return ()=>{
            if(!this.props.addressList.edit){
                this.props.history.goBack();
                this.props.position.selected(item);
            }
        }
    }
    showDeleteBtn(event){
        if(this.props.addressList.edit){
            console.log(event.touches[0].clientX);
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li className={receiveAddressListStyle.address_nodes}
                    key={index}
                    onClick={this.choose(item)}>
                    <SlideOperateView start={{x:0}} className={receiveAddressListStyle.receiver_box}>
                        <View className={receiveAddressListStyle.receiver_info_box}>
                            <View className={receiveAddressListStyle.receiver_info}>
                                {item.addressTagName?<Text className={receiveAddressListStyle.address_label}>{item.addressTagName}</Text>:""}
                                <Text>{item.name}</Text>
                                <Text className={receiveAddressListStyle.telephone}>{item.phoneNum}</Text >
                            </View>
                            <Text className={receiveAddressListStyle.location}>
                                <Text>{item.address.cityName}</Text>
                                <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
                            </Text>
                        </View>
                        {this.props.addressList.edit?<Link to='/createOrEditAddress' className={receiveAddressListStyle.operate_edit}/>:""}
                    </SlideOperateView>

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