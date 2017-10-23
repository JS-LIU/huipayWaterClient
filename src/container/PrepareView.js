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
@inject (['prepare'])
@observer class PrepareView extends Component{
    componentWillMount(){
        let pageUrl = this.props.prepare.pageUrl;

        if(localStorage.access_secret){
            this.props.history.replace(pageUrl);
        }else{
            this.props.login.autoLogin(()=>{
                this.props.history.replace(pageUrl);
            });
        }
    }
    render(){
        return (
            <View />
        )
    }
}
module.exports = PrepareView;