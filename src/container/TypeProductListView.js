import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import View from '../components/View';
import _h from '../Util/HB';
import ShopShoppingCartView from './ShopShoppingCartView';
import typeProductListStyle from '../css/typeProductListStyle.css';

@inject(['productList_mock'])
// @inject(['productType_mock'])

@observer class TypeProductListView extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.productList_mock.getProductList();
    }
    cutType(e){
        //  todo react onScroll 的属性detail返回值始终为0
        // let scrollTop = e.target.scrollTop;
        // this.props.productList_mock.autoSelectedType(scrollTop);
    }
    selectedType(item){
        return (e)=>{
            e.preventDefault();
            // let moveDom = this.refs.productList;
            // this.props.productList_mock.selectedType(moveDom,item);

        }
    }
    render(){
        // let typeNodes = this.props.productList_mock.productType.map((item,index)=>{
        //     return (
        //         <li
        //             className={typeProductListStyle.product_type_item}
        //             key={index}
        //             style={item.select?green:white}
        //             onClick={this.selectedType(item)}>
        //             {item.name}
        //         </li>
        //     )
        // });
        let productTypeRightNodes = this.props.productList_mock.list.map((type,index)=>{
            let productNodes = type.productList.map((product,j)=>{
                return (
                    <li key={j} className={typeProductListStyle.product_list_item}>
                        <span>{product.info.name}</span>
                        {type.id === 4 ? <SelectedSellStrategy product={product}/>:<NumCtrl product={product}/>}
                    </li>
                )
            });
            return (
                <li key={index}>
                    <div className = {typeProductListStyle.product_type_item_right}>{type.name}</div>
                    <ul>
                        {productNodes}
                    </ul>
                </li>
            )
        });

        return (
            <View className={typeProductListStyle.product_window}>
                <View className={typeProductListStyle.product_list_body}>
                    {/* todo 商品样式可以 单独放出来一个组件<TypeList typeList={this.props.typeList}/>*/}
                    <ul className={typeProductListStyle.product_type}>
                        {/*{typeNodes}*/}
                    </ul>
                    <ul className={typeProductListStyle.product_list}
                        onScrollCapture={this.cutType.bind(this)}
                        ref="productList">
                        {productTypeRightNodes}
                    </ul>
                </View>

                <ShopShoppingCartView productList={this.props.productList_mock.list}/>
            </View>
        )
    }
}


@observer class SelectedSellStrategy extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View>
                <span>选套餐</span>
            </View>
        )
    }
}
@observer class NumCtrl extends Component{
    constructor(props){
        super(props);
    }
    add(){
        this.props.product.add()
    }
    reduce(){
        this.props.product.reduce()
    }
    render(){
        return (
            <span>
                <span onClick={this.reduce.bind(this)}>-</span>
                <span>{this.props.product.info.count}</span>
                <span onClick={this.add.bind(this)}>+</span>
            </span>
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