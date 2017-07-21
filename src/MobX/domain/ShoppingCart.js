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
        let self = this;
        self.isAllChecked = !self.isAllChecked;
        for(let i = 0,product;product = self.cartList[i++];){
            product.checked = self.isAllChecked;
        }
        console.log(self.cartList);
    }
    @computed get totalCount(){
        let count = 0;
        let self = this;
        for(let i =0,product;product = self.cartList[i++];){
            count += product.count;
        }
        return count;
    }
    @computed get totalPrice(){
        let price = 0;
        let self = this;
        for(let i =0,product;product = self.cartList[i++];){
            price += (product.count * product.price);
        }
        return price;
    }
    @computed get isAllChecked(){
        let isAllChecked = true;
        let self = this;
        for(let i =0,product;product = self.cartList[i++];){
            if(!product.checked){
                return false;
            }
        }
        return true;
    }
}

module.exports = ShoppingCart;