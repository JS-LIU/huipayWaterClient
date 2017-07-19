/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import View from './View';
import Footer_nav from './Footer_nav';
import Water from '../container/WaterView';
import CreateOrder from '../container/CreateOrderView'

import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom'

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                {this.props.children}
                <Redirect to='/home/water'/>
                <div>
                    <Route path="/home/water" component={Water}/>
                    <Route path="/home/waterShopList" component={CreateOrder}/>
                </div>
                <Footer_nav/>
            </View>

        )
    }
}
module.exports = Home;