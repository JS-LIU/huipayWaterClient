/**
 * Created by LDQ on 2017/10/10
 */
import React, {Component} from 'react';
import View from '../components/View';
import Text from '../components/Text';
import Button from '../components/Button';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
@inject (['login'])
@observer class PrepareView extends Component{
    componentWillMount(props){
        this.props.login.autoLogin(this.props.history);
    }
    render(){
        return (
            <View />
        )
    }
}
module.exports = PrepareView;