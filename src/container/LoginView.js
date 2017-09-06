/**
 * Created by LDQ on 2017/9/5
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import loginStyle from '../css/loginStyle.css';

import _h from '../Util/HB';
import {observer,inject} from 'mobx-react';

@inject(['login'])

@observer class LoginView extends Component{
    constructor(props){
        super(props);
    }
    inputPhoneNum(){
        let val = this.refs.phoneNum.value;
        this.refs.phoneNum.value = _h.valid.validNum(val,[3,4,4]," ");
        this.props.login.setPhoneNum(val);
    }
    getCheckCode(){
        this.props.login.getCheckCode();
    }
    login(){
        let historyPath = this.props.history;
        this.props.login.clientLogin(historyPath);
    }
    render(){
        return (
            <View className={loginStyle.bg}>
                <ul className={loginStyle.login}>
                    <li className={loginStyle.phone_number_list}>
                        <input
                            type="text"
                            className={loginStyle.input_box}
                            ref="phoneNum"
                            placeholder="手机号"
                            onChange={this.inputPhoneNum.bind(this)}
                        />
                        <Button className={loginStyle.count_down}
                                style={this.props.login.canGetCheckCode?count_down_can_click:count_down_cant_click}
                                onClick={this.getCheckCode.bind(this)}>
                            <Text
                                className={loginStyle.count_down_text}
                                style={this.props.login.canGetCheckCode?whiteText:blackText}
                            >{this.props.login.time}</Text>
                        </Button>
                    </li>
                    <li className={loginStyle.check_code_list}>
                        <input type="text"
                               className={loginStyle.input_box}
                               placeholder="验证码"
                        />
                    </li>
                </ul>
                <Button className={loginStyle.login_btn} onClick={this.login.bind(this)}>
                    <Text className={loginStyle.login_text}>登录</Text>
                </Button>
            </View>
        )
    }
}
module.exports = LoginView;

const count_down_can_click = {
    background:"#399cfe",

};
const count_down_cant_click = {
    background:"#f4f4f4",
};
const blackText = {
    color:"#999"
};
const whiteText = {
    color:"#FFF"
};