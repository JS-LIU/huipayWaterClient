import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';


@inject (['autoMap'])

@observer class InputAddressView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ul>
                <li>
                    <span>收货人：</span>
                    <span></span>
                </li>
                <li>
                    <span>联系方式：</span>
                    <span></span>
                </li>
                <li>
                    <span>所在区域：</span>
                    <Link to="/autoCompleteAddress">{this.props.autoMap.showLocationInfo.receiveAddress}</Link>
                </li>
                <li>
                    <span>详细地址：</span>
                    <input type="text" placeholder="填写具体地址(如：单元号/门牌号/楼层"/>
                </li>
                <li>
                    <span>==家==</span>
                    <span>==公司==</span>
                    <span>==学校==</span>
                </li>
            </ul>

        )
    }
}
module.exports = InputAddressView;