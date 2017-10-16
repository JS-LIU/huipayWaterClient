import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import waterTicketsStyle from '../css/waterTicketsStyle.css';

import {observer,inject} from 'mobx-react';

// @inject (['my'])
@inject (['userWaterTicketList'])
@inject (['order'])

@observer class WaterTicketsView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.userWaterTicketList.getList();
    }
    useTicket(waterTicket){
        return ()=>{
            waterTicket.useTicket(this.props.userWaterTicketList.list);
            this.props.order.getSettleOrder("default",{userTicketId:waterTicket.id},this.props.history);
        }
    }
    render(){
        let waterTicketNodes = this.props.userWaterTicketList.list.map((waterTicket,index)=>{
            return (
                <li key={index} className={waterTicketsStyle.water_ticket}>
                    <View className={waterTicketsStyle.water_ticket_left}>
                        <View className={waterTicketsStyle.water_ticket_count}>
                            <Text className={waterTicketsStyle.count}>{waterTicket.max}</Text>
                            <Text className={waterTicketsStyle.unit}>张</Text>
                        </View>
                    </View>

                    <View className={waterTicketsStyle.water_ticket_right}>
                        <Text className={waterTicketsStyle.name}>{waterTicket.name}</Text>
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