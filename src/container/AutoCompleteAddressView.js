import React, {Component} from 'react';
import View from '../components/View';
import {Link} from 'react-router-dom';
import autoMapStyle from '../css/autoMapStyle.css';
//  MobX
import {observer,inject} from 'mobx-react';

@inject (['autoMap'])

@observer class AutoCompleteAddressView extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.autoMap.autoComplete()
    }
    render(){
        return (
            <View>
                <span>{this.props.autoMap.city}</span>
                <input id="tipinput"/>
            </View>
        )
    }
}
module.exports = AutoCompleteAddressView;