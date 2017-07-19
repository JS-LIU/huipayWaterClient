/**
 * Created by zhangq on 2017/7/18.
 */

//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShopSceneryView from './ShopSceneryView';
import ShopInfoView from './ShopInfoView';
import ShopMerchantView from './ShopMerchantView';

@observer class ShopDetailView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View style={style}>
                <ShopSceneryView />
                <ShopInfoView />
                <ShopMerchantView />
            </View>
        )
    }
}

module.exports = ShopDetailView;
const style={
    background:'#EEEFF3',

};
