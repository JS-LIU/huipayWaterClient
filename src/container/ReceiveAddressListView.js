import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
@inject (['addressList'])

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
            console.log('删除');
            this.props.addressList.remove(item);
        }
    }
    setDefault(item){
        return ()=>{
            console.log('设置默认');
            this.props.addressList.setDefault(item);
        }
    }
    choose(item){
        return ()=>{
            this.props.addressList.selected(item)
        }
    }
    changeHandle(){
        return;
    }
    render(){
        /**
         * fromUrl:从哪个页面跳转过来的
         * 有可能从['/shop','productDetail','/createOrder']跳转过来
         */
        let fromUrl = this.props.location.state.from;

        let addressNodes = this.props.addressList.list.map((item,index)=>{
            return (
                <li className={receiveAddressListStyle.address_nodes} key={index}>
                    <Link to={fromUrl} onClick = {this.choose(item)}>
                        <View className={receiveAddressListStyle.receiver_info}>
                            <p className={receiveAddressListStyle.consignee}>{item.receiveName}</p >
                            <p className={receiveAddressListStyle.telephone}>{item.phoneNum}</p >
                            <p className={receiveAddressListStyle.address_label}>学校</p >
                        </View>
                        <p className={receiveAddressListStyle.location}>
                            {item.receiveAddress}
                        </p >
                    </Link>
                    <View className={receiveAddressListStyle.operate}>
                        <p
                            className={receiveAddressListStyle.operate_default}
                            onClick={this.setDefault(item)}>
                            <input type="checkbox"
                                   checked={item.default}
                                   name="address"
                                   onChange={this.changeHandle}
                                   className={item.default?receiveAddressListStyle.address_checked:receiveAddressListStyle.address_no_checked}/>
                            <span>默认地址</span>
                        </p>
                        <p className={receiveAddressListStyle.operate_amend}>
                            <Link to = {{pathname:'/inputAddress',state:{action:'edit'}}}
                                  onClick={this.edit(item)}
                                  className={receiveAddressListStyle.operate_edit}>
                                编辑
                            </Link>
                            <span onClick={this.remove(item)} className={receiveAddressListStyle.operate_delete}>删除</span>
                        </p>
                    </View>
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