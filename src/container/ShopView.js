/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';
//  components
import View from '../components/View';
import ReceiveAddressView from './ReceiveAddressView';


import shopStyle from '../css/shopStyle.css';

//  MobX
import {observer,inject} from 'mobx-react';
@inject(['shoppingList'])

class ShopView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.shoppingList.getList();
    }
    render(){
        return (
            <View className={shopStyle.wrap}>
                <ReceiveAddressView current={this.props.location.pathname}/>

            </View>
        )
    }
}


module.exports = ShopView;