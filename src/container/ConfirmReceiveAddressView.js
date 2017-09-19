//  react
import React, {Component} from 'react';
import Text from '../components/Text';
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
                {this.props.activeAddress.deliverAddress?<ActiveAddressView />:<CreateAddressView />}
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
        return (
            <Link to='/receiveAddressList' className={addNewAddressStyle.add_new_address}>
                <Text className={addNewAddressStyle.address_detail}>新增地址</Text >
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
            <Link to="/receiveAddressList" className={addNewAddressStyle.address_info}>
                <View className={addNewAddressStyle.delivery_person}>
                    <View>
                        <Text className={addNewAddressStyle.name_title}>收货人：</Text>
                        <Text className={addNewAddressStyle.name_text}>{this.props.activeAddress.deliverAddress.name}</Text>
                    </View>

                    <Text className={addNewAddressStyle.phone_num}>{this.props.activeAddress.deliverAddress.phoneNum}</Text>
                </View>
                <View className={addNewAddressStyle.delivery_address}>
                    <Text className={addNewAddressStyle.delivery_address_text}>送货地址：</Text>
                    <Text className={addNewAddressStyle.address}>{this.props.activeAddress.deliverAddress.receiveAddress}</Text>
                </View>
            </Link>
        )
    }
}


module.exports = ConfirmReceiveAddressView;