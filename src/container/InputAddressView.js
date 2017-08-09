import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import inputAddressStyle from '../css/inputAddressStyle.css';

@inject (['autoMap'])
@inject (['addressList'])
@inject (['historyPath'])

@observer class InputAddressView extends Component{
    constructor(props){
        super(props);
        this.setName = this.setName.bind(this);
        this.setPhoneNum = this.setPhoneNum.bind(this);
        this.setSpecificAddress = this.setSpecificAddress.bind(this);
    }
    componentWillMount(){
        //  当前地址
        let pathname = this.props.location.pathname;
        //  推入历史
        this.props.historyPath.put(pathname);

    }
    componentDidMount(){
        this.refs.myName.value = this.props.addressList.inputInfo.receiveName;
        this.refs.myPhoneNum.value =  this.props.addressList.inputInfo.phoneNum;
        this.refs.specificAddress.value = this.props.addressList.inputInfo.specificAddress;
    }
    setName(){
        this.props.addressList.inputInfo.receiveName = this.refs.myName.value;
    }
    setPhoneNum(){
        this.props.addressList.inputInfo.phoneNum = this.refs.myPhoneNum.value;
    }
    setSpecificAddress(){
        this.props.addressList.inputInfo.specificAddress = this.refs.specificAddress.value;
    }
    createAddress(){
        this.props.addressList.create();
    }
    render(){
        return (
            <View className={inputAddressStyle.new_box}>
                <ul className={inputAddressStyle.new_build_address}>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>收货人：</span>
                        <input
                            type="text"
                            className={inputAddressStyle.info_input}
                            ref="myName"
                            onBlur={this.setName}
                            placeholder="收货人姓名"
                        />
                    </li>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>联系方式：</span>
                        <input type="text"
                               className={inputAddressStyle.info_input}
                               ref="myPhoneNum"
                               onBlur={this.setPhoneNum}
                               placeholder="收货人电话"
                        />
                    </li>
                    <li className={inputAddressStyle.address_info_area}>
                        <span className={inputAddressStyle.info_desc_area}>所在区域：</span>
                        <Link to="/autoCompleteAddress" className={inputAddressStyle.area_choose}>{this.props.autoMap.showLocationInfo.receiveAddress}</Link>
                    </li>
                    <li className={inputAddressStyle.address_info}>
                        <span className={inputAddressStyle.info_desc}>详细地址：</span>
                        <input type="text"
                               className={inputAddressStyle.info_input}
                               ref="specificAddress"
                               onBlur={this.setSpecificAddress}
                               placeholder="具体地址"
                        />
                    </li>
                    <li className={inputAddressStyle.address_info_label}>
                        <p className={inputAddressStyle.info_desc}>标签：</p>
                        <p className={inputAddressStyle.label_choose}>家</p>
                        <p className={inputAddressStyle.label_choose}>公司</p>
                        <p className={inputAddressStyle.label_choose}>学校</p>
                    </li>
                </ul>
                <Link to="/receiveAddressList" className={inputAddressStyle.save_new_address} onClick={this.createAddress.bind(this)}>保存</Link>
            </View>
        )
    }
}
module.exports = InputAddressView;