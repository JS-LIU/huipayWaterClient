/**
 * Created by LDQ on 2017/9/26
 */
import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import {Link} from 'react-router-dom';

import ReceiveAddressListView from './ReceiveAddressListView';
import receiveAddressListStyle from '../css/receiveAddressListStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@observer class ReceiverListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    render(){
        return (
            <View>
                <ReceiveAddressListView />
                <View>
                    <Text>添加地址</Text>
                </View>
            </View>
        )
    }
}
module.exports = ReceiverListView;