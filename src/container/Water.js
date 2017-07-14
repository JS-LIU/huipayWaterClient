/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import View from '../components/View';
import Button from '../components/Button';

import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';


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
                <span>微信登录 没有登录成功不会跳转页面 这里模拟一下</span>
                <Link to='/shop'>店铺</Link>
            </View>
        )
    }
}
module.exports = Water;