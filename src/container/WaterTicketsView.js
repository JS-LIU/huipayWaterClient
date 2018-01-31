import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import waterTicketsStyle from '../css/waterTicketsStyle.css';

import {observer,inject} from 'mobx-react';

// @inject (['my'])
@inject (['useWaterTicketList'])
@inject (['order'])

@observer class WaterTicketsView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.useWaterTicketList.getList(
           function(){
               return null;
           }, this.props.history);
    }
    useTicket(waterTicket){
        return ()=>{
            this.props.order.setOrderType({userTicketId:waterTicket.userTicketId});
            this.props.order.getSettleOrder({userTicketId:waterTicket.userTicketId},"default",this.props.history);
        }
    }
    render(){
        let waterTicketNodes = this.props.useWaterTicketList.list.map((waterTicket,index)=>{
            return (
                <li key={index} className={waterTicketsStyle.water_ticket}>
                    <View className={waterTicketsStyle.water_ticket_left}>
                        <View className={waterTicketsStyle.water_ticket_count}>
                            <Text className={waterTicketsStyle.count}>{waterTicket.count}</Text>
                            <Text className={waterTicketsStyle.unit}>张</Text>
                        </View>
                    </View>

                    <View className={waterTicketsStyle.water_ticket_right}>
                        <Text className={waterTicketsStyle.name}>{waterTicket.productName}</Text>
                        <View className={waterTicketsStyle.use_box}>
                            <Text className={waterTicketsStyle.rest_day}>剩{waterTicket.restDay}</Text>
                            <Link to="/confirmOrder"
                                  className={waterTicketsStyle.use_btn}
                                  onClick={this.useTicket(waterTicket)}>立即使用</Link>
                        </View>
                    </View>
                </li>
            )
        });
        return (
            <View className={waterTicketsStyle.wrap}>
                <ul>
                    {waterTicketNodes}
                </ul>
            </View>

        )
    }
}

module.exports = WaterTicketsView;