/**
 * Created by LDQ on 2017/9/17
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import AutoCompleteAddressView from './AutoCompleteAddressView';
import ReceiveAddressListView from './ReceiveAddressListView';

import {observer,inject} from 'mobx-react';

@observer class AddressListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <AutoCompleteAddressView />
                <ReceiveAddressListView />
            </View>
        )
    }
}

module.exports = AddressListView;