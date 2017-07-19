/**
 * Created by LDQ on 2017/7/11.
 */

//  react
import React, {Component} from 'react';

//  components
import View from '../components/View';
import ReceiveAddressView from './ReceiveAddressView';

//  MobX
import {observer,inject} from 'mobx-react';

@observer class CreateOrderView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <span>确认订单页面！</span>
                <ReceiveAddressView/>
            </View>
        )
    }
}
module.exports = CreateOrderView;