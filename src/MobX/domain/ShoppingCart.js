/**
 * Created by LDQ on 2017/7/12.
 */

import {observable, computed,action,autorun} from "mobx";
import ShoppingCartProduct from './ShoppingCartProduct';
import shoppingCartService from '../service/shoppingCartService';

class ShoppingCart{

    @observable cartList = [];
    findProduct(targetProduct){
        let targetProductInfo = targetProduct.productBasicInfo;

        let findDistributeProductId = function(){
            if(targetProductInfo.purchaseProductType === "distribute"){
                return function(everyProduct){
                    if(everyProduct.distributeProductId === targetProductInfo.distributeProductId){
                        return everyProduct;
                    }
                }
            }else{
                return "nextSuccessor";
            }
        };
        let findSelfProductId = function(){
            if(targetProductInfo.purchaseProductType === "self_support"){
                return function(everyProduct){
                    if(everyProduct.selfProductId === targetProductInfo.selfProductId){
                        return everyProduct;
                    }
                }
            }else{
                return "nextSuccessor";
            }
        };
        return findDistributeProductId.after(findSelfProductId)();

    }


    @action put(item){
        let self = this;
        let sameProduct = self.cartList.find(self.findProduct(item));
        if(sameProduct){
            sameProduct.increase();
        }else{
            let product = new ShoppingCartProduct(item);
            self.cartList.push(product);
        }
    }

    @action allCheck(){
        if(this.isAllChecked){
            for(let i =0,len = this.cartList.length;i < len; i++){
                this.cartList[i].checked = false;
            }
        }else{
            for(let i =0,len = this.cartList.length;i < len; i++){
                this.cartList[i].checked = true;
            }
        }
    }
    @computed get isAllChecked(){
        for(let i =0,len = this.cartList.length;i < len; i++){
            if(!this.cartList[i].checked){
                return false;
            }
        }
        return true;
    }
    @computed get totalCount(){
        let count = 0;
        for(let i =0,len = this.cartList.length;i < len;i++){
            if(this.cartList[i].checked){
                count += this.cartList[i].count;
            }
        }
        return count;
    }
    @computed get totalPrice(){
        let price = 0;
        let self = this;
        for(let i =0,len = this.cartList.length;i < len; i++){
            if(this.cartList[i].checked){
                price += (this.cartList[i].count * this.cartList[i].price);
            }

        }
        return price;
    }
}

module.exports = ShoppingCart;