/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShopSummary from './ShopSummary';
import ReceiveAddress from './ReceiveAddress';
import TicketList from './TicketList';
import ProductList from './ProductList';

@observer class Shop extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <ReceiveAddress />
                <ShopSummary />
                <TicketList />
                <ProductList />
            </View>
        )
    }
}

module.exports = Shop;