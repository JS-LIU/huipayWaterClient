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

@observer class CreateAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Link to={{pathname:'/inputAddress',state:{action:'create'}}} className={addNewAddressStyle.add_new_address}>
                <p className={addNewAddressStyle.address_detail}>
                    新增地址
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
            <Link to={{pathname:'/receiveAddressList',state:{from:'createOrder'}}} >
                <ul>
                    <li>
                        <span>收货人：</span>
                        <span>{this.props.activeAddress.address.info.receiveName}</span>
                    </li>
                    <li>
                        <span>{this.props.activeAddress.address.info.phoneNum}</span>
                    </li>
                    <li>
                        <span>送货地址：</span>
                        <span>{this.props.activeAddress.address.info.receiveAddress}</span>
                    </li>
                </ul>
            </Link>
        )
    }
}


module.exports = ConfirmReceiveAddressView;