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
        this.searchAddress = this.searchAddress.bind(this);
    }
    componentDidMount(){

    }
    searchAddress(){
        this.props.autoMap.autoComplete(this.refs.addressName.value);
    }
    render(){
        let addressNodes = this.props.autoMap.searchAddressList.map((item,index)=>{
            return (
                <li key = {index}>{item.name}</li>
            )
        });
        return (
            <View>
                <span>{this.props.autoMap.city}</span>
                <input type="text" placeholder="输入搜索地址" ref="addressName" onKeyUp={this.searchAddress}/>
                <ul>{addressNodes}</ul>
            </View>
        )
    }
}
module.exports = AutoCompleteAddressView;