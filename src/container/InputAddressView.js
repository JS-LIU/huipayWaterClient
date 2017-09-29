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
    componentWillMount(){
        this.props.addressTagList.getTagList();
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
    selectedTag(tag){
        return ()=>{
            this.props.addressTagList.selected(tag);
            this.props.editAddressInfo.setTag(tag);
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
                        onBlur={this.setName.bind(this)}
                        placeholder="姓名"
                        defaultValue={this.props.customAddress.userInfo.name}
                    />
                </li>
                <li className={inputAddressStyle.address_info}>
                    <Text className={inputAddressStyle.info_desc}>电话：</Text>
                    <input type="text"
                           className={inputAddressStyle.info_input}
                           ref="myPhoneNum"
                           onBlur={this.setPhoneNum.bind(this)}
                           placeholder="手机号码"
                           defaultValue={this.props.customAddress.userInfo.phoneNum}
                    />
                </li>
                <li className={inputAddressStyle.address_info_area}>
                    <Text className={inputAddressStyle.info_desc_area}>地址：</Text>
                    <Link to="/map"
                          className={inputAddressStyle.area_choose}>
                        {this.props.customAddress.addressInfo.receiveAddress}
                    </Link>
                </li>
                <li className={inputAddressStyle.address_info}>
                    <Text className={inputAddressStyle.info_desc}>门牌号：</Text>
                    <input type="text"
                           className={inputAddressStyle.info_input}
                           ref="specificAddress"
                           onBlur={this.setSpecificAddress.bind(this)}
                           placeholder="例：11号楼302室"
                           defaultValue={this.props.customAddress.speAddress}
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