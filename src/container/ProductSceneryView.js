/**
 * Created by zhangq on 2017/7/18.
 */

//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import productSceneryStyle from '../css/productSceneryStyle.css'

@observer class ProductSceneryView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <div className={productSceneryStyle.product_scenery}>
                    <img src="" className={productSceneryStyle.scenery_pic}/>
                </div>
            </View>
        )
    }
}
module.exports = ProductSceneryView;
