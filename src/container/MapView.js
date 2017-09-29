/**
 * Created by LDQ on 2017/9/27
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import Button from '../components/Button';
import Text from '../components/Text';

import selectedAddressMapStyle from '../css/selectedAddressMapStyle.css';

import CustomAddress from '../MobX/domain/location/CustomAddress';
import AutoMap from '../MobX/domain/location/AutoMap';
import {observer,inject} from 'mobx-react';


@inject (['customAddress'])
@observer class MapView extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let addressInfo = this.props.customAddress.addressInfo;
        let center = [addressInfo.longitude,addressInfo.latitude];
        this.props.customAddress.createMap({zoom:16, center: center});
        this.props.customAddress.dragMap();
    }
    confirmAndGoBack(){
        this.props.history.goBack();
    }
    render(){
        return (
            <View>
                <div id="container"/>
                <View className={selectedAddressMapStyle.map_address_info}>
                    <Link to="/autoCompleteAddress" replace className={selectedAddressMapStyle.map_name}>
                        <Text className={selectedAddressMapStyle.map_name_bg}>{this.props.customAddress.addressInfo.receiveAddress}</Text>
                    </Link>
                    <Button className={selectedAddressMapStyle.confirm} onClick={this.confirmAndGoBack.bind(this)}>确定</Button>
                </View>
            </View>
        )
    }
}

module.exports = MapView;
