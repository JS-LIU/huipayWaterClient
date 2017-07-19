/**
 * Created by zhangq on 2017/7/18.
 */

//  react
import React, {Component} from 'react';
//  MobX
import {observer,inject} from 'mobx-react';
//  components
import View from '../components/View';
import shopSceneryStyle from '../css/shopSceneryStyle.css'
@inject (['shopDetail'])

@observer class ShopSceneryView extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <View>
                <div className={shopSceneryStyle.scenery_box}>
                    <img src={this.props.shopDetail.info.baseInfoModel.imageUrl} className={shopSceneryStyle.scenery_pic}/>
                </div>
            </View>

        )
    }
}
module.exports = ShopSceneryView;