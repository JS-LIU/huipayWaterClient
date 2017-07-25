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
                {this.props.activeAddress.activityLocation.state === "currentPos"?<CreateAddressView />:<ActiveAddressView />}
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

class ActiveAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Link to='/AddressList'>
                后台返回的字段和格式呵呵呵
            </Link>
        )
    }
}


module.exports = ConfirmReceiveAddressView;