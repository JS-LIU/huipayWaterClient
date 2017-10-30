import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Text from '../components/Text';
import View from '../components/View';
import Button from '../components/Button';
import waterTicketsStyle from '../css/waterTicketsStyle.css';

import {observer,inject} from 'mobx-react';

@inject (['useWaterTicketList'])
@inject (['order'])
@observer class UseWaterTicketsView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.useWaterTicketList.getUseTicket(this.props.order.orderTicket.list);
    }
    reduce(waterTicket){
        return ()=>{
            waterTicket.reduce();
        }
    }
    increase(waterTicket){
        return ()=>{
            waterTicket.increase();
        }
    }
    refreshOrder(){
        let history = this.props.history;
        this.props.order.getSettleOrder(this.props.order.orderType,"refresh",history);
        history.goBack();
    }
    render(){
        let waterTicketNodes = this.props.useWaterTicketList.useTicket.map((waterTicket,index)=>{
            return (
                <li key={index} className={waterTicketsStyle.water_ticket}>
                    <View className={waterTicketsStyle.water_ticket_left}>
                        <View className={waterTicketsStyle.water_ticket_count}>
                            <Text className={waterTicketsStyle.count}>{waterTicket.count}</Text>
                            <Text className={waterTicketsStyle.unit}>张</Text>
                        </View>
                    </View>

                    <View className={waterTicketsStyle.water_ticket_right}>
                        <Text className={waterTicketsStyle.name}>{waterTicket.brandName}</Text>
                        <View className={waterTicketsStyle.use_box}>
                            {waterTicket.isCanUse?<View className={waterTicketsStyle.product_item_ctrl}>
                                {waterTicket.selectUseCount > 0?<Button className={waterTicketsStyle.product_reduce} onClick={this.reduce(waterTicket)} />:""}
                                <Text className={waterTicketsStyle.product_count}>{waterTicket.selectUseCount}</Text>
                                {waterTicket.canUseCount > waterTicket.selectUseCount?<Button className={waterTicketsStyle.product_increase} onClick={this.increase(waterTicket)} />:""}
                            </View>:<View className={waterTicketsStyle.cant_use}/>}
                        </View>
                    </View>
                </li>
            )
        });
        return (
            <View className={waterTicketsStyle.wrap}>
                <ul className={waterTicketsStyle.list}>
                    {waterTicketNodes}
                </ul>
                <Button className={waterTicketsStyle.footer}
                        onClick={this.refreshOrder.bind(this)}>确定
                </Button>

            </View>

        )
    }
}

module.exports = UseWaterTicketsView;