/**
 * Created by LDQ on 2017/7/15.
 */
class ShoppingCartProduct{
    constructor(item){
        let productBasicInfo = item.productBasicInfo;

        this.count = 1;
        this.price = item.showPrice;
        this.distributeProductId = productBasicInfo.distributeProductId;
        this.selfProductId = productBasicInfo.selfProductId;
        this.provideShopId = productBasicInfo.provideShopId;
        this.saleShopId = productBasicInfo.saleShopId;
        this.purchaseProductType = productBasicInfo.purchaseProductType;
        this.productId = item.productId;
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
}
module.exports = ShoppingCartProduct;