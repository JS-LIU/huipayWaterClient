/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";
import ProductList from './ProductList';

class TypeItem{
    constructor(type,noRepeatProductList){
        this.id = type.id;
        this.name = type.name;
        this._selectCount = type.selectCount;
        //  productList是一个 对象{}
        this._productList = new ProductList(type.productList,noRepeatProductList);
    }
    @observable _selectCount;
    @observable _productList = {};
    //  selectCount是【productList对象】的属性
    @computed get selectCount(){
        return this.productList.totalCount;
    }
    @computed get productList(){
        return this._productList;
    }
}

module.exports = TypeItem;