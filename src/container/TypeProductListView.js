import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import View from '../components/View';

import typeProductListStyle from '../css/typeProductListStyle.css';


class TypeProductListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
    }
    cutType(e){
        console.log(e.detail)
    }

    render(){
        /**
         * mock 商品分类数据
         * @type {{type: [null,null,null]}}
         */
        let testProductType = {
            list:[
                {id:'1',name:'type1'},
                {id:'2',name:'type2'},
                {id:'3',name:'type3'},
                // {id:'4',name:'type1'},
                // {id:'5',name:'type2'},
                // {id:'6',name:'type3'},
                // {id:'7',name:'type1'},
                // {id:'8',name:'type2'},
                // {id:'9',name:'type3'},
                // {id:'10',name:'type1'},
                // {id:'11',name:'type2'},
                // {id:'12',name:'type3'},
                // {id:'13',name:'type1'},
                // {id:'14',name:'type2'},
                // {id:'15',name:'type3'},
                // {id:'16',name:'type1'},
                // {id:'17',name:'type2'},
                // {id:'18',name:'type3'},
                // {id:'19',name:'type1'},
                // {id:'20',name:'type2'},
                // {id:'21',name:'type3'},
                // {id:'22',name:'type1'},
                // {id:'23',name:'type2'},
                // {id:'24',name:'type3'}
                ]
        };
        let typeNodes = testProductType.list.map((item,index)=>{
            return (
                <li className={typeProductListStyle.product_type_item} key={index}>
                    {item.name}
                </li>
            )
        });
        let testProductList = {
            list:[
                {id:'1',name:'water A',typeId:'1'},
                {id:'2',name:'water B',typeId:'1'},
                {id:'3',name:'water C',typeId:'1'},
                {id:'4',name:'water D',typeId:'1'},
                {id:'1',name:'water E',typeId:'2'},
                {id:'2',name:'water F',typeId:'2'},
                {id:'3',name:'water G',typeId:'2'},
                {id:'4',name:'water H',typeId:'2'},
                {id:'5',name:'water I',typeId:'2'},
                {id:'6',name:'water J',typeId:'2'},
                {id:'7',name:'water K',typeId:'2'},
                {id:'8',name:'water L',typeId:'2'},
                {id:'9',name:'water M',typeId:'2'},
                {id:'10',name:'water n',typeId:'2'},
                {id:'11',name:'water O',typeId:'2'},
                {id:'12',name:'water P',typeId:'2'},
                {id:'13',name:'water Q',typeId:'2'},
                {id:'14',name:'water R',typeId:'3'}
                ]
        };
        let productNodes = testProductList.list.map((item,index)=>{
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
                    <ul className={typeProductListStyle.product_list} onScrollCapture={this.cutType.bind(this)}>
                        {productNodes}
                    </ul>
                </View>
            </View>

        )
    }
}

module.exports = TypeProductListView;