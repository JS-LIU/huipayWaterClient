/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import View from '../components/View';
import Button from '../components/Button';

import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';


import waterStyle from '../css/waterStyle.css';

//  todo 临时登录
@inject (['login'])

@observer
class Water extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.login.clientLogin("18801233565",'111111','phonenum');
    }
    render(){
        return(
            <View>
                <span>我是个还没实现的首页 我可以跳转到确认订单页面啊哈哈哈！</span>
                <Link to='/createOrder'>确认订单</Link>
            </View>
        )
    }
}
module.exports = Water;