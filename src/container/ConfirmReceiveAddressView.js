//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  components
import View from '../components/View';
import addNewAddressStyle from '../css/addNewAddressStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject(['activeAddress'])

@observer class ConfirmReceiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                {this.props.activeAddress.address.state === "currentPos"?<CreateAddressView />:<ActiveAddressView />}
            </View>
        )
    }
}
@inject(['addressList'])
@observer class CreateAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let hasList = this.props.addressList.hasList;
        let url = hasList?'/receiveAddressList':'/inputAddress';
        return (
            <Link to={{pathname:url,state:{action:'create',from:'/createOrder'}}} className={addNewAddressStyle.add_new_address}>
                <p className={addNewAddressStyle.address_detail}>
                    {hasList?'选择':'新增'}地址
                </p >
            </Link>
        )
    }
}

@inject(['activeAddress'])
@observer class ActiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Link to={{pathname:'/receiveAddressList',state:{from:'/createOrder'}}} >
                <ul className={addNewAddressStyle.delivery_message}>
                    <li className={addNewAddressStyle.delivery_person}>
                        <span className={addNewAddressStyle.consignee}>收货人：{this.props.activeAddress.address.info.receiveName}</span>
                        <span className={addNewAddressStyle.connect}>{this.props.activeAddress.address.info.phoneNum}</span>
                    </li>
                    <li className={addNewAddressStyle.delivery_address}>
                        <span>送货地址：</span>
                        <span className={addNewAddressStyle.address}>{this.props.activeAddress.address.info.receiveAddress}</span>
                    </li>
                </ul>
            </Link>
        )
    }
}


module.exports = ConfirmReceiveAddressView;