/**
 * Created by LDQ on 2017/7/3.
 */
import React, {Component} from 'react';
import View from './View';
import Footer_nav from './Footer_nav';

class Home extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                {this.props.children}
                <Footer_nav/>
            </View>
        )
    }
}
module.exports = Home;