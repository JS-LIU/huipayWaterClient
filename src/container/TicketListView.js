/**
 * Created by LDQ on 2017/7/14.
 */
import React, {Component} from 'react';
import View from '../components/View';

//  MobX
import {observer,inject} from 'mobx-react';

@inject (['activeAddress'])

@observer class TicketListView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <span>水票更优惠</span>

            </View>
        )
    }
}
module.exports = TicketListView;