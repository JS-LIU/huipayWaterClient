import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
@inject (['addressList'])
@inject (['customAddress'])
@inject (['activeAddress'])

@observer class ReceiveAddressListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList();
    }
    edit(item){
        return ()=>{
            this.props.addressList.inputInfo.receiveName = item.receiveName;
            this.props.addressList.inputInfo.phoneNum = item.phoneNum;
            this.props.addressList.inputInfo.specificAddress = "";
        }
    }
    remove(item){
        return ()=>{
            this.props.addressList.remove(item);
        }
    }
    choose(item){
        return ()=>{
            this.props.activeAddress.selectedCurrentAddress(item)
        }
    }
    render(){
        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li className={receiveAddressListStyle.address_nodes} key={index}>
                    <Link to="/shop" onClick = {this.choose(item)}>
                        <View className={receiveAddressListStyle.receiver_info}>
                            <p className={receiveAddressListStyle.consignee}>{item.name}</p >
                            <p className={receiveAddressListStyle.telephone}>{item.phoneNum}</p >
                            <p className={receiveAddressListStyle.address_label}>{item.addressTagName}</p >
                        </View>
                        <p className={receiveAddressListStyle.location}>
                            <Text>{item.address.cityName}</Text>
                            <Text>{item.address.mapAddress + (item.address.appendingAddress||"")}</Text>
                        </p >
                    </Link>
                    {/*<View className={receiveAddressListStyle.operate}>*/}
                        {/*<p className={receiveAddressListStyle.operate_amend}>*/}
                            {/*<Link to = {{pathname:'/inputAddress',state:{action:'edit'}}}*/}
                                  {/*onClick={this.edit(item)}*/}
                                  {/*className={receiveAddressListStyle.operate_edit}>*/}
                                {/*编辑*/}
                            {/*</Link>*/}
                            {/*<span onClick={this.remove(item)} className={receiveAddressListStyle.operate_delete}>删除</span>*/}
                        {/*</p>*/}
                    {/*</View>*/}
                </li>
            )
        });
        return (
            <View className={receiveAddressListStyle.receive_address_list}>
                <ul className={receiveAddressListStyle.address_list}>
                    {addressNodes}
                </ul>
                <Link to={{pathname:'/inputAddress',state:{action:'create'}}}
                      className={receiveAddressListStyle.address_btn}>
                    新建地址
                </Link>
            </View>
        )
    }
}
module.exports = ReceiveAddressListView;