/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';

@inject (['shoppingCart'])
@observer class ShoppingCartView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                购物车
            </View>
        )
    }
}

module.exports = ShoppingCartView;