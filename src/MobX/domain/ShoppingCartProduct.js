/**
 * Created by LDQ on 2017/7/15.
 */
import {observable, computed,action,autorun} from "mobx";
import shoppingCartService from '../service/shoppingCartService';

class ShoppingCartProduct{
    constructor(item){
        let productBasicInfo = item.productBasicInfo;

        this.price = item.showPrice;
        this.distributeProductId = productBasicInfo.distributeProductId;
        this.selfProductId = productBasicInfo.selfProductId;
        this.provideShopId = productBasicInfo.provideShopId;
        this.saleShopId = productBasicInfo.saleShopId;
        this.purchaseProductType = productBasicInfo.purchaseProductType;
        this.productId = item.productId;
        this.productName = item.productName;
        this.spec = item.spec;

        this.count = 1;
        this.checked = false;
    }

    findSelf(productList){
        let self = this;
        let findDistributeProductId = function(){
            if(self.purchaseProductType === "distribute"){
                return productList.find(function(item){
                    if(item.distributeProductId === self.distributeProductId){
                        return item;
                    }
                })
            }else{
                return "nextSuccessor";
            }
        };
        let findSelfProductId = function(){
            if(self.purchaseProductType === "self_support"){
                return productList.find(function(item){
                    if(item.selfProductId === self.selfProductId){
                        return item;
                    }
                })
            }else{
                return "nextSuccessor";
            }
        };
        return findDistributeProductId.after(findSelfProductId)();
    }

    increase(step = 1){
        this.count += step;
        shoppingCartService.trigger('refresh');
    }
    check(){
        this.checked = !this.checked;
        shoppingCartService.trigger('refresh');
    }
}
module.exports = ShoppingCartProduct;