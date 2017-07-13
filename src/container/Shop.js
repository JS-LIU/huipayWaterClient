/**
 * Created by LDQ on 2017/7/13.
 */
//  react
import React, {Component} from 'react';

//  components
import View from '../components/View';
import ReceiveAddress from './ReceiveAddress';

//  MobX
import {observer,inject} from 'mobx-react';

@inject(['shopDetail'])

@observer class Shop extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <ShopSummary shopDetail = {this.props.shopDetail}/>
            </View>
        )
    }
}

class ShopSummary extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        console.log(this.props.shopDetail.info);
    }
    render(){
        return (
            <View>
                SHOPSUMMARY
            </View>
        )
    }
}


module.exports = Shop;