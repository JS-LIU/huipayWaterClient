/**
 * Created by LDQ on 2017/9/11
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
import TypeItem from './TypeItem';
import Product from './Product';


class ShoppingList {
    constructor(rem2pxRate, login) {
        this.rem2pxRate = rem2pxRate;
        this.login = login;
        this._recordProductList = [];
        this.customerSelectedIndex = false;
        let self = this;
        //  请求 商品列表
        let ajax = _h.ajax.resource('/shop/shoppingcart/:action');

        this.getProductList = function (postInfo) {
            return ajax.save({action: "productList"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }

    @action getList(shopId) {
        this.getProductList({
            shopId: shopId
        }).then((list) => {
            this._tagModelList = list.tagModelList;
        });
    }

    //  去除重复的 商品列表
    @observable _noRepeatProductList;
    @computed get noRepeatProductList() {
        let list = [];
        for (let i = 0; i < this._tagModelList.length; i++) {       //  tag

            let productList = this._tagModelList[i].productList;
            for (let j = 0; j < productList.length; j++) {         //  productList

                let product = productList[j].productItemModels;
                for (let k = 0; k < product.length; k++) {          //  productItem
                    let hasProductItem = function (productItem) {
                        if (productItem.productItemId === product[k].productItemId) {
                            return productItem;
                        }
                    };

                    let productItem = list.find(hasProductItem);
                    if (!productItem) {
                        productItem = new Product(productList[j].name,productList[j].type, productList[j].imageUrl, product[k]);
                        list.push(productItem);
                    }
                }
            }
        }
        return list;
    }
    //  商品列表
    @observable _tagModelList = [];

    @computed get tagModelList() {
        let list = [];
        for (let i = 0, len = this._tagModelList.length; i < len; i++) {
            list.push(new TypeItem(this._tagModelList[i], this.noRepeatProductList));
        }
        return list;
    }
    //  购物车列表
    @computed get shoppingCart(){
        let list = [];
        for(let i = 0;i < this.noRepeatProductList.length;i++){
            if(this.noRepeatProductList[i].selectCount > 0){
                list.push(this.noRepeatProductList[i]);
            }
        }
        return list;
    }
    @computed get totalCount(){
        let count = 0;
        for(let i = 0;i < this.shoppingCart.length;i++){
            count += this.shoppingCart[i].selectCount;
        }
        return count;
    }

    @computed get totalPrice(){
        let price = 0;
        for(let i = 0;i < this.shoppingCart.length;i++){
            price += (this.shoppingCart[i].selectCount * this.shoppingCart[i].currentPrice);
        }
        return price;
    }
    @observable _show = false;
    @action showShoppingCart(){
        this._show = !this._show;
    }
    @computed get show(){
        return this._show;
    }
}
module.exports = ShoppingList;