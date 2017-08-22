import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';
import {observer,inject} from 'mobx-react';


@observer class ShopShoppingCartView extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let productNodes = this.prop.productList.map((item,index)=>{
            return (
                <li>

                </li>
            )
        });
        return (
            <View>

            </View>
        )
    }
}

module.exports = ShopShoppingCartView;

