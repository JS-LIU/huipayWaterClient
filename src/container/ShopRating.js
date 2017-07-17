import React, {Component} from 'react';
import View from '../components/View';

class ShopRating extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
               <span>星星</span>
            </View>
        )
    }
}
module.exports = ShopRating;