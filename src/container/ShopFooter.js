/**
 * Created by LDQ on 2017/7/17.
 */
//  react
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import ShoppingCartProduct from '../MobX/domain/ShoppingCartProduct';

@inject (['shoppingCart'])
@observer class ShopFooter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <View>
                    <Link to="/shoppingCart">购物车{this.props.shoppingCart.total}</Link>
                </View>

            </View>
        )
    }
}

module.exports = ShopFooter;