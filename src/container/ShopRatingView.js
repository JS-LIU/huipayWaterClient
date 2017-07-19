import React, {Component} from 'react';
import View from '../components/View';

class ShopRatingView extends Component{
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
module.exports = ShopRatingView;