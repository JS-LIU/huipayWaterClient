/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  components
import View from '../components/View';
import ShopSummaryView from './ShopSummaryView';
import ReceiveAddressView from './ReceiveAddressView';
import TicketListView from './TicketListView';
import ProductListView from './ProductListView';
import ShopFooterView from './ShopFooterView';
//  MobX
import {observer,inject} from 'mobx-react';

@inject(['historyPath'])

class ShopView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        //  当前地址
        let pathname = this.props.location.pathname;
        //  推入历史
        this.props.historyPath.put(pathname);

    }
    render(){
        return (
            <View style={shopStyle}>
                <ReceiveAddressView current={this.props.location.pathname}/>
                <ShopSummaryView />
                {/*<TicketListView />*/}
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