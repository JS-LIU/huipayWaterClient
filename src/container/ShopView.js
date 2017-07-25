/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShopSummaryView from './ShopSummaryView';
import ReceiveAddressView from './ReceiveAddressView';
import TicketListView from './TicketListView';
import ProductListView from './ProductListView';
import ShopFooterView from './ShopFooterView';

@observer class ShopView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={shopStyle}>
                <ReceiveAddressView />
                <ShopSummaryView />
                <TicketListView />
                <ProductListView />
                <ShopFooterView />
            </View>
        )
    }
}

module.exports = ShopView;
const shopStyle={
    background:'#EEEFF3',
    minHeight:'13.33rem'
};