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
                    <Link to='/homePageCreateAddress'
                          className={addressListStyle.create_btn}>新建地址</Link>
                </View>
                <ReceiveAddressListView history={this.props.history}/>
                <View className={addressListStyle.address_title}>附近地址</View>
                <NearAddress history={this.props.history}/>
            </View>
        )
    }
}

@inject (['location'])
@observer class CurrentAddress extends Component{
    constructor(props){
        super(props);
    }
    resetCurrentAddress(){
        this.props.location.getCurrentMap();
    }
    choose(){
        this.props.history.goBack();
        this.props.location.selectedHomeAddress(this.props.location.current);
    }
    render(){
        return (
            <View className={addressListStyle.current_address}>
                <Button
                    className={addressListStyle.current_address_info}
                    onClick={this.choose.bind(this)}>{this.props.location.current.receiveAddress}</Button>
                <Button className={addressListStyle.current_address_reset} onClick={this.resetCurrentAddress.bind(this)}>重新定位</Button>
            </View>
        )
    }
}

@inject (['location'])
@observer class NearAddress extends Component{
    constructor(props){
        super(props);
    }
    choose(item){
        return ()=>{
            this.props.location.selectedHomeAddress(item);
            this.props.history.goBack();
        }
    }
    render(){
        let nearAddressNodes = this.props.location.nearAddressList.map((item,index)=>{
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




// @inject (['addressList'])
// @inject (['activeAddress'])
//
// @observer class ReceiveAddressListView extends Component{
//     constructor(props){
//         super(props);
//     }
//     componentWillMount(){
//         this.props.addressList.getAddressList();
//     }
//     choose(item){
//         return ()=>{
//             this.props.activeAddress.selectedCurrentAddress(item);
//         }
//     }
//     removeAddress(item){
//         return ()=>{
//             console.log(item);
//             this.props.addressList.remove(item);
//         }
//     }
//     render(){
//         let addressNodes = this.props.addressList.list.map((item,index)=>{
//             return (
//                 <li className={receiveAddressListStyle.address_nodes} key={index}>
//                     <Link to="/shop" onClick = {this.choose(item)} className={receiveAddressListStyle.address_info}>
//                         <View className={receiveAddressListStyle.receiver_info}>
//                             <p >{item.name}</p >
//                             <p className={receiveAddressListStyle.telephone}>{item.phoneNum}</p >
//                             {item.addressTagName?<p className={receiveAddressListStyle.address_label}>{item.addressTagName}</p>:""}
//                         </View>
//                         <p className={receiveAddressListStyle.location}>
//                             <Text>{item.address.cityName}</Text>
//                             <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
//                         </p>
//                     </Link>
//                     <Button className={receiveAddressListStyle.delete_address_btn} onClick={this.removeAddress(item)}>删除</Button>
//                 </li>
//             )
//         });
//         return (
//             <ul className={receiveAddressListStyle.address_list}>
//                 {addressNodes}
//             </ul>
//         )
//     }
// }
// @inject (['autoMap'])
// @inject (['activeAddress'])
// @observer class AutoCompleteAddressView extends Component{
//     constructor(props){
//         super(props);
//         this.searchAddress = this.searchAddress.bind(this);
//     }
//     searchAddress(){
//         this.props.autoMap.autoComplete(this.refs.addressName.value);
//     }
//     choose(name){
//         return ()=>{
//             this.props.autoMap.searchAddressDetail(name);
//             this.props.autoMap.hideNearAddressList();
//             this.props.activeAddress.selectedCurrentAddress(this.props.autoMap.showLocationInfo);
//         }
//     }
//     cancel(){
//         this.props.autoMap.searchAddressDetail("");
//         this.refs.addressName.value = "";
//         this.props.autoMap.hideNearAddressList();
//     }
//     show(){
//         this.props.autoMap.showNearAddressList();
//     }
//     render(){
//         let addressNodes = this.props.autoMap.searchAddressList.map((item,index)=>{
//             return (
//                 <li key={index}
//                     className={autoCompleteAddressStyle.address_node}
//                     onClick={this.choose(item.name)} >
//                     <Link to="/shop" replace>
//                         <p className={autoCompleteAddressStyle.consignee_address}>
//                             {item.name}
//                         </p>
//                         <p className={autoCompleteAddressStyle.consignee_location}>
//                             {item.district}
//                         </p>
//                     </Link>
//                 </li>
//             )
//         });
//         return (
//             <View className={autoCompleteAddressStyle.auto_complete_address}>
//                 <View className={autoCompleteAddressStyle.head_input}>
//                     <input type="text"
//                            placeholder="输入搜索地址"
//                            ref="addressName"
//                            onKeyUp={this.searchAddress}
//                            className={autoCompleteAddressStyle.address_input} onFocus={this.show.bind(this)}/>
//                     <Button className={autoCompleteAddressStyle.cancel} onClick={this.cancel.bind(this)}>取消</Button>
//                 </View>
//                 {this.props.autoMap.showAddressList?<ul>
//                     {addressNodes}
//                 </ul>:""}
//             </View>
//         )
//     }
// }

module.exports = AddressListView;