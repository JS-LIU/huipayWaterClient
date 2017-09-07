/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  components
import View from '../components/View';
import ReceiveAddressView from './ReceiveAddressView';
import HeadShopInfoView from './HeadShopInfoView'

import shopStyle from '../css/shopStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';
@inject(['shoppingList'])

@observer class ShopView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shoppingList.getList(1);
    }
    render(){
        return (
            <View>
                <ReceiveAddressView current={this.props.location.pathname}/>
                <HeadShopInfoView />
            </View>
        )
    }
}


module.exports = ShopView;