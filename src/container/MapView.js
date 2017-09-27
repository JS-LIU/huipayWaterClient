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


@inject (['position'])
@inject (['customAddress'])
@observer class MapView extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let homePageAddress = this.props.position.homePageAddress;
        let center = [homePageAddress.longitude,homePageAddress.latitude];
        this.props.customAddress.createMap({zoom:16, center: center});
        this.props.customAddress.dragMap();
    }
    render(){
        return (
            <View>
                <div id="container"/>
                <View />
                <View className={selectedAddressMapStyle.map_address_info}>
                    <View className={selectedAddressMapStyle.map_name}>
                        <Text className={selectedAddressMapStyle.map_name_bg}>{this.props.customAddress.addressInfo.receiveAddress}</Text>
                    </View>
                    <Button className={selectedAddressMapStyle.confirm}>确定</Button>
                </View>
            </View>
        )
    }
}

module.exports = MapView;
