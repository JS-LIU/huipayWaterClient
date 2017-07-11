/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import View from '../components/View';
import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import waterStyle from '../css/waterStyle.css';

import locationService from '../MobX/service/locationService';



//  todo 临时登录
@inject (['login'])
//  todo 放到locationService的职责链中
@inject (['autoMap'])
@inject (['addressList'])

@observer

class Water extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.addressList.getAddressList(1,50);
        let addressList = this.props.addressList;
        let autoMap = this.props.autoMap;
        this.props.login.clientLogin("18801233565",'111111','phonenum');
        this.props.autoMap.currentLocationInfo();
        locationService.getActivityLocation(addressList,autoMap);
    }

    render(){
        return(
            <div className={waterStyle.order}>
                <div id="container" className={waterStyle.map}></div>
                <view className={waterStyle.address}>
                    <Link to="/" className={waterStyle.order_titleCity}>
                        <span id="city">北京</span>
                    </Link>
                    <span className={waterStyle.sentAddress_tip}>收货地址：</span>
                    <Link to="/AddressList" className={waterStyle.sentAddress_detail} id="mark">{this.props.autoMap.formattedAddress}</Link>
                    <Link to='/createOrder'>确认订单</Link>
                </view>

                {/*<img src="src/images/line.png" className={waterStyle.line}/>*/}
                {/*<img src="" alt="这里有图片" className={waterStyle.mainPic}/>*/}
                {/*<Link to="/Water">*/}
                    {/*<div className={waterStyle.barrelled}>*/}
                        {/*<p className={waterStyle.barrelled_title}>桶装水热卖</p>*/}
                        {/*<img src="" alt="" className={waterStyle.barrelled_pic}/>*/}
                    {/*</div>*/}
                {/*</Link>*/}
                {/*<div className={waterStyle.recommend}>*/}
                    {/*<div className={waterStyle.water_ticket}>*/}
                        {/*<Link to="/WaterTicket">*/}
                            {/*<p className={waterStyle.water_coupon}>水票更优惠</p>*/}
                            {/*<p className={waterStyle.water_coupon_sub}>电子水票,全城通用</p>*/}
                            {/*<div className={waterStyle.coupon_pic}>*/}
                                {/*<img src="" alt="" className={waterStyle.pail}/>*/}
                                {/*<div className={waterStyle.ticket_text}>*/}
                                    {/*<p className={waterStyle.ticket_title}>喜腾山泉</p>*/}
                                    {/*<p className={waterStyle.ticket_subTitle}>天然饮用水 18L</p>*/}
                                {/*</div>*/}
                                {/*/!*<p className={waterStyle.ticket_scope}>全市通用</p>*!/*/}
                            {/*</div>*/}
                        {/*</Link>*/}
                    {/*</div>*/}
                    {/*<div className={waterStyle.other}>*/}
                        {/*<p className={waterStyle.water_coupon}>发现好货</p>*/}
                        {/*<p className={waterStyle.water_coupon_sub}>柴米油盐酱醋茶</p>*/}
                        {/*<div className={waterStyle.other_pic}>*/}
                            {/*<img src="" alt=""/>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {/*<div className={waterStyle.productList}>*/}
                    {/*<ProductList*/}
                        {/*order={this.props.order}*/}
                    {/*/>*/}
                {/*</div>*/}
            </div>
        )
    }
}
module.exports = Water;