/**
 * Created by LDQ on 2017/7/12.
 */

import {observable, computed,action} from "mobx";

class ShoppingCart{

    constructor(){
        //  如果不是本地购物车则需要autorun cartList 同时 该构造函数需要login作为参数
    }
    @observable cartList = [];

    @computed get total(){
        let totalNum = 0;
        for(let i = 0 ;i < this.cartList.length;i++){
            totalNum += this.cartList[i].count;
        }

        return totalNum;
    }

    // @action increaseNum(step = 1){
    //
    //     product.count += step;
    //     console.log(product.count);
    // }


    @action put(product){

        let self = this;
        let sameProduct = product.findSelf(self.cartList);
        if(sameProduct){
            console.log('---数量+1');
        }else{
            console.log('---加入购物车');
            self.cartList.push(product);
        }
        console.log(self.cartList);
    }

}

module.exports = ShoppingCart;