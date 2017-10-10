/**
 * Created by LDQ on 2017/7/14.
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';

import myStyle from '../css/myStyle.css';


import {observer,inject} from 'mobx-react';

@inject (['my'])
@observer class MyView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.my.getUserInfo(this.props.history);
    }
    logOut(){
        localStorage.clear();
    }
    render(){
        return (
            <View className={myStyle.wrap}>
                <View className={myStyle.header}>
                    <View className={myStyle.user_img_protect}>
                        {/*<img src="http://localhost/images/head_def.gif" alt="" className={myStyle.user_img}/>*/}
                    </View>
                    <View className={myStyle.user_info}>
                        <Text className={myStyle.user_name}>{this.props.my.userInfo.userName}</Text>
                        <Text className={myStyle.user_phoneNum}>{this.props.my.userInfo.phoneNum}</Text>
                    </View>
                </View>
                <ul className={myStyle.list}>
                    <li className={myStyle.water_ticket}>
                        <Link to="/waterTickets" className={myStyle.water_ticket_title}>水票</Link>
                    </li>
                    <li className={myStyle.order_list}>
                        <Link to='/orderList' className={myStyle.order_list_title}>订单</Link>
                    </li>
                    <li className={myStyle.call}>
                        <a href="tel:4006078300" className={myStyle.call_title}>客服</a>
                    </li>
                    <li className={myStyle.logout}>
                        <Link to="/login" className={myStyle.logout_btn} onClick={this.logOut.bind(this)}>退出</Link>
                    </li>
                </ul>
            </View>
        )
    }
}

module.exports = MyView;