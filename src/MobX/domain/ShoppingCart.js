/**
 * Created by LDQ on 2017/7/12.
 */

import {observable, computed,action} from "mobx";
import ShoppingCartProduct from './ShoppingCartProduct';
import shoppingCartService from '../service/shoppingCartService';

class ShoppingCart{

    constructor(){
        let self = this;
        //  如果不是本地购物车则需要autorun cartList 同时 该构造函数需要login作为参数
        shoppingCartService.listen('refresh',()=>{
            self.total = 0;
            console.log("开始重新计算购物车");
            for(let i = 0;i < self.cartList.length;i++){
                console.log("商品++====",self.cartList[i]);
                self.total += self.cartList[i].count;
            }
        })
    }
    @observable cartList = [];
    @observable total = 0;
    //
    // @computed get total(){
    //     let totalNum = 0;
    //     for(let i = 0 ;i < this.cartList.length;i++){
    //         totalNum += this.cartList[i].count;
    //     }
    //
    //     return totalNum;
    // }



    @action put(item){

        let self = this;
        let product = new ShoppingCartProduct(item);

        let sameProduct = product.findSelf(self.cartList);
        if(sameProduct){
            console.log('---数量+1');
            sameProduct.increase();
        }else{
            console.log('---加入购物车');
            self.cartList.push(product);
        }
        shoppingCartService.trigger('refresh');

    }


}

module.exports = ShoppingCart;