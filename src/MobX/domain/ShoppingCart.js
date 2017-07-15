/**
 * Created by LDQ on 2017/7/12.
 */

import {observable, computed,action} from "mobx";

class ShoppingCart{

    constructor(){
        //  如果不是本地购物车则需要autorun cartList 同时 该构造函数需要login作为参数
    }
    @observable cartList = [];
    @observable productNum = 0;

    @computed get totalNum(){
        return this.cartList.length;
    }

    findProduct(item){
        let hasItem = function(everyItem){
            if(everyItem.id === item.id){
                return item;
            }
        };

        return this.cartList.find(hasItem);
    }
    @action increaseNum(item,step = 1){
        item.num += step;
        this.productNum = item.num;
    }

    @action addShoppingCart(item){
        let product = this.findProduct(item);
        if(product){
            this.increaseNum(product);
        }else{
            this.cartList.push(item)
        }
    }

}

module.exports = ShoppingCart;