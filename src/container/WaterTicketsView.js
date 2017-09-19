import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import waterTicketsStyle from '../css/waterTicketsStyle.css';

import {observer,inject} from 'mobx-react';

@inject(['my'])
class WaterTicketsView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.my.getUserTickets();
    }
    render(){
        let waterTicketNodes = this.props.my.waterTicketList.map((waterTicket,index)=>{
            return (
                <li key={index} className={waterTicketsStyle.water_ticket}>
                    <View className={waterTicketsStyle.water_ticket_left}>
                        <View>
                            <Text className={waterTicketsStyle.count}>{waterTicket.count}</Text>
                            <Text className={waterTicketsStyle.unit}>张</Text>
                        </View>
                    </View>
                    <View className={waterTicketsStyle.water_ticket_right}>
                        <Text className={waterTicketsStyle.name}>{waterTicket.brandName}</Text>
                        <Text className={waterTicketsStyle.restDay}>剩{waterTicket.restDay}天</Text>

                    </View>
                </li>
            )
        });
        return (
            <ul>
                {waterTicketNodes}
            </ul>
        )
    }
}

module.exports = WaterTicketsView;