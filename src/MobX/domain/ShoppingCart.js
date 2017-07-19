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
            let isChecked = function(product){
                if(product.checked){
                    return true;
                }
                return false;

            };

            self.productIterator(isChecked,[self.calcTotalCount,self.calcTotalPrice])

        })
    }
    productIterator(condition,calcList){
        let self = this;
        self.totalCount = 0;
        self.totalPrice = 0;
        self.isAllChecked = true;

        for(let i = 0,product;product = self.cartList[i++];){
            if(condition(product)){
                self.calcIterator(calcList,product);
            }
            if(!product.checked){
                self.isAllChecked = false;
            }
        }
    }
    calcIterator(list,product){
        let self = this;
        let funcList = Array.prototype.shift.call(arguments);
        for(let i = 0,calcFunc;calcFunc = funcList[i++];){
            calcFunc.apply(self,arguments);
        }
    }

    calcTotalCount(product){
        let self = this;
        self.totalCount += product.count;
    }
    calcTotalPrice(product){
        let self = this;
        self.totalPrice += (product.price * product.count);
    }

    @observable cartList = [];
    @observable totalCount = 0;
    @observable totalPrice = 0;
    @observable isAllChecked = true;

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
    @action allCheck(){
        let self = this;
        self.isAllChecked = !self.isAllChecked;
        for(let i = 0,product;product = self.cartList[i++];){
            product.checked = self.isAllChecked;
        }
        console.log(self.cartList);
        shoppingCartService.trigger('refresh');
    }

}

module.exports = ShoppingCart;