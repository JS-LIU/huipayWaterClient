import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import inputAddressStyle from '../css/inputAddressStyle.css';

@inject (['autoMap'])
@inject (['addressList'])
@inject (['customAddress'])

@observer class InputAddressView extends Component{
    constructor(props){
        super(props);
    }
    setName(){
        this.props.customAddress.setName(this.refs.myName.value);
    }
    setPhoneNum(){
        this.props.customAddress.setNum(this.refs.myPhoneNum.value);
    }
    setSpecificAddress(){
        this.props.customAddress.setSpeAddress(this.refs.specificAddress.value)
    }
    createAddress(){

        this.props.addressList.create(this.props.customAddress.info,this.props.autoMap.showLocationInfo);
    }
    render(){
        return (
            <View className={inputAddressStyle.input_box}>
                <ul className={inputAddressStyle.new_build_address}>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>收货人：</span>
                        <input
                            type="text"
                            className={inputAddressStyle.info_input}
                            ref="myName"
                            onBlur={this.setName.bind(this)}
                            placeholder="收货人姓名"
                            defaultValue={this.props.customAddress.info.name}
                        />
                    </li>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>联系方式：</span>
                        <input type="text"
                               className={inputAddressStyle.info_input}
                               ref="myPhoneNum"
                               onBlur={this.setPhoneNum.bind(this)}
                               placeholder="收货人电话"
                               defaultValue={this.props.customAddress.info.num}
                        />
                    </li>
                    <li className={inputAddressStyle.address_info_area}>
                        <span className={inputAddressStyle.info_desc_area}>所在区域：</span>
                        <Link to="/autoCompleteAddress"
                              replace
                              className={inputAddressStyle.area_choose}>
                            {this.props.autoMap.showLocationInfo.receiveAddress}
                        </Link>
                    </li>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>详细地址：</span>
                        <input type="text"
                               className={inputAddressStyle.info_input}
                               ref="specificAddress"
                               onBlur={this.setSpecificAddress.bind(this)}
                               placeholder="具体地址"
                               defaultValue={this.props.customAddress.info.speAddress}
                        />
                    </li>
                    <li className={inputAddressStyle.address_info_label}>
                        <p className={inputAddressStyle.info_desc}>标签：</p>
                        <p className={inputAddressStyle.label_choose}>家</p>
                        <p className={inputAddressStyle.label_choose}>公司</p>
                        <p className={inputAddressStyle.label_choose}>学校</p>
                    </li>
                </ul>
                <Link to="/receiveAddressList" replace className={inputAddressStyle.save_new_address} onClick={this.createAddress.bind(this)}>保存</Link>
            </View>
        )
    }
}
module.exports = InputAddressView;