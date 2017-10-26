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
@inject (['customAddress'])
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
            if(!this.props.addressList.canEdit){
                this.props.history.goBack();
                this.props.position.selected(item);
            }
        }
    }
    removeAddress(item){
        return ()=>{
            this.props.addressList.removeItem(item);
        }
    }
    editAddress(item){
        return ()=>{
            this.props.customAddress.setName(item.name);
            this.props.customAddress.setNum(item.phoneNum);
            this.props.customAddress.setBeforeAddress({
                latitude:item.position.latitude,
                longitude:item.position.longitude,
                receiveAddress:item.receiveAddress
            });
            this.props.customAddress.setAddressId(item.id);
            this.props.addressList.setOperateStrategy('edit');
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            let addressInfo = (<View className={receiveAddressListStyle.receiver_info_box}>
                <View className={receiveAddressListStyle.receiver_info}>
                    {item.addressTagName?<Text className={receiveAddressListStyle.address_label}>{item.addressTagName}</Text>:""}
                    <Text>{item.name}</Text>
                    <Text className={receiveAddressListStyle.telephone}>{item.phoneNum}</Text >
                </View>
                <Text className={receiveAddressListStyle.location}>
                    <Text>{item.address.cityName}</Text>
                    <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
                </Text>
            </View>);
            return (
                <li className={receiveAddressListStyle.address_nodes}
                    key={index}
                    onClick={this.choose(item)}>
                    {this.props.addressList.canEdit?
                        <SlideOperateView start={{x:0}} className={receiveAddressListStyle.receiver_box}>
                            {addressInfo}
                            <Link to='/createOrEditAddress'
                                  className={receiveAddressListStyle.operate_edit}
                                  onClick={this.editAddress(item)}/>
                        </SlideOperateView>:
                        <View className={receiveAddressListStyle.receiver_box}>
                            {addressInfo}
                        </View>
                    }
                    {this.props.addressList.canEdit?<Button className={receiveAddressListStyle.delete_address_btn}
                            onClick={this.removeAddress(item)}>删除</Button>:""}
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