/**
 * Created by LDQ on 2017/7/15.
 */
import {observable, computed,action,autorun} from "mobx";
import shoppingCartService from '../service/shoppingCartService';

class ShoppingCartProduct{

    @observable count = 1;
    @observable checked = true;

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
    }

    increase(step = 1){
        this.count += step;
    }
    reduce(step = 1){
        this.count -= step;
    }

    check(){
        this.checked = !this.checked;
    }
}
module.exports = ShoppingCartProduct;