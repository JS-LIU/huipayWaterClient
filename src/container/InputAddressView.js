import React, {Component} from 'react';
import View from '../components/View';


//  MobX
import {observer,inject} from 'mobx-react';


@inject (['activeAddress'])

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
                    <span></span>
                </li>
                <li>
                    <span>详细地址：</span>
                    <span></span>
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