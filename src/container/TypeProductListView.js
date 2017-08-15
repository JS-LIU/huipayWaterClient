import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';

import typeProductListStyle from '../css/typeProductListStyle.css';
import {observer,inject} from 'mobx-react';

@inject(['productList_mock'])

@observer class TypeProductListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    cutType(e){
        //  todo react onScroll 的属性detail返回值始终为0
        let scrollTop = e.target.scrollTop;
        this.props.productList_mock.autoSelectedType(scrollTop);
    }
    selectedType(item){
        return (e)=>{
            e.preventDefault();
            let moveDom = this.refs.productList;
            this.props.productList_mock.selectedType(moveDom,item);

        }
    }
    render(){
        let typeNodes = this.props.productList_mock.productType.map((item,index)=>{
            return (
                <li
                    className={typeProductListStyle.product_type_item}
                    key={index}
                    style={item.select?green:white}
                    onClick={this.selectedType(item)}>
                    {item.name}
                </li>
            )
        });
        let productNodes = this.props.productList_mock.productList.map((item,index)=>{
            return (
                <li className = {typeProductListStyle.product_list_item} key={index}>
                    {item.name}
                </li>
            )
        });

        return (
            <View className={typeProductListStyle.product_window}>
                <View className={typeProductListStyle.product_list_body}>
                    {/* todo 商品样式可以 单独放出来一个组件<TypeList typeList={this.props.typeList}/>*/}
                    <ul className={typeProductListStyle.product_type}>
                        {typeNodes}
                    </ul>
                    <ul className={typeProductListStyle.product_list}
                        onScrollCapture={this.cutType.bind(this)}
                        ref="productList">
                        {productNodes}
                    </ul>
                </View>
            </View>

        )
    }
}

module.exports = TypeProductListView;
const green = {
    background:'green',
    color:'#FFF'
};
const white = {
    background:'#FFF'
};