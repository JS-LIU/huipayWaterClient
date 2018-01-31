import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
import inputAddressStyle from '../css/inputAddressStyle.css';

@inject (['addressTagList'])
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
    setAppendingAddress(){
        this.props.customAddress.setAppendingAddress(this.refs.appendingAddress.value)
    }
    selectedTag(tag){
        return ()=>{
            this.props.customAddress.setTag(tag);
            this.props.addressTagList.selected(tag);
        }
    }
    render(){
        let tagNodes = this.props.addressTagList.tagList.map((tag,index)=>{
            return (
                <li key={index}
                    className={inputAddressStyle.label_choose}
                    style={tag.selected?selectedTag:{}}
                    onClick={this.selectedTag(tag)}>
                        {tag.name}
                </li>
            )
        });
        return (
            <ul className={inputAddressStyle.new_build_address}>
                <li className={inputAddressStyle.address_info}>
                    <Text className={inputAddressStyle.info_desc}>收货人：</Text>
                    <input
                        type="text"
                        className={inputAddressStyle.info_input}
                        ref="myName"
                        onChange={this.setName.bind(this)}
                        placeholder="姓名"
                        defaultValue={this.props.customAddress.userInfo.name}
                    />
                </li>
                <li className={inputAddressStyle.address_info}>
                    <Text className={inputAddressStyle.info_desc}>电话：</Text>
                    <input type="text"
                           className={inputAddressStyle.info_input}
                           ref="myPhoneNum"
                           onChange={this.setPhoneNum.bind(this)}
                           placeholder="手机号码"
                           defaultValue={this.props.customAddress.userInfo.phoneNum}
                    />
                </li>
                <li className={inputAddressStyle.address_info_area}>
                    <Text className={inputAddressStyle.info_desc_area}>地址：</Text>
                    <Link to="/map"
                          className={inputAddressStyle.area_choose}>
                        {this.props.customAddress.addressInfo.fullAddress}
                    </Link>
                </li>
                <li className={inputAddressStyle.address_info}>
                    <Text className={inputAddressStyle.info_desc}>门牌号：</Text>
                    <input type="text"
                           className={inputAddressStyle.info_input}
                           ref="appendingAddress"
                           onBlur={this.setAppendingAddress.bind(this)}
                           placeholder="例：11号楼302室"
                           defaultValue={this.props.customAddress.appendingAddress}
                    />
                </li>
                <li className={inputAddressStyle.address_info_label}>
                    <Text className={inputAddressStyle.info_desc}>标签：</Text>
                    <ul className={inputAddressStyle.tag_list}>
                        {tagNodes}
                    </ul>
                </li>
            </ul>
        )
    }
}
module.exports = InputAddressView;

const selectedTag = {
    border:"0.01rem solid #399cfe",
    color:"#399cfe"
};