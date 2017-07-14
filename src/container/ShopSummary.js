/**
 * Created by LDQ on 2017/7/14.
 */
//  react
import React, {Component} from 'react';
import View from '../components/View';
//  MobX
import {observer,inject} from 'mobx-react';

@inject(['shopDetail'])

@observer class ShopSummary extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                {this.props.shopDetail.info.distributionScope}
            </View>
        )
    }
}
module.exports = ShopSummary;