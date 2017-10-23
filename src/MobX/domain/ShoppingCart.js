/**
 * Created by LDQ on 2017/7/12.
 */

import {observable, computed,action,autorun} from "mobx";
import ShoppingCartProduct from './ShoppingCartProduct';

class ShoppingCart{

    @observable _cartList = [];
    @computed get cartList(){
        return this._cartList;
    }
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
        let sameProduct = self._cartList.find(self.findProduct(item));
        if(sameProduct){
            sameProduct.increase();
        }else{
            let product = new ShoppingCartProduct(item);
            self._cartList.push(product);
        }
    }

    @action allCheck(){
        if(this.isAllChecked){
            for(let i =0,len = this._cartList.length;i < len; i++){
                this._cartList[i].checked = false;
            }
        }else{
            for(let i =0,len = this._cartList.length;i < len; i++){
                this._cartList[i].checked = true;
            }
        }
    }
    @action deleteProduct(){
        this._cartList = this.unCheckedProductList;
    }
    @computed get checkedProductList(){
        let checkedList = [];
        for(let i = 0,len = this._cartList.length;i < len;i++){
            if(this._cartList[i].checked){
                checkedList.push(this._cartList[i]);
            }
        }
        return checkedList;
    }
    @computed get unCheckedProductList(){
        let unCheckedList = [];
        for(let i = 0,len = this._cartList.length;i < len;i++){
            if(!this._cartList[i].checked){
                unCheckedList.push(this._cartList[i]);
            }
        }
        return unCheckedList;
    }

    @computed get isAllChecked(){
        for(let i =0,len = this._cartList.length;i < len; i++){
            if(!this._cartList[i].checked){
                return false;
            }
        }
        return true;
    }
    @computed get totalCount(){
        let count = 0;
        for(let i =0,len = this._cartList.length;i < len;i++){
            if(this._cartList[i].checked){
                count += this._cartList[i].count;
            }
        }
        return count;
    }
    @computed get totalPrice(){
        let price = 0;
        for(let i =0,len = this._cartList.length;i < len; i++){
            if(this._cartList[i].checked){
                price += (this._cartList[i].count * this._cartList[i].price);
            }

        }
        return price;
    }
}

module.exports = ShoppingCart;