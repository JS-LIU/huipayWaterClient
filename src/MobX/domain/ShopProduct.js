import {observable, computed,action,autorun} from "mobx";

class ShopProduct {
    constructor(product) {
        this.info = product;
    }

    add(step = 1, max = this.product.storeNum) {
        if ( this.info.count < max) {
            this.info.count += step;
        }

    }
    reduce(step = 1, min = 0) {
        if (this.info.count > min) {
            this.info.count -= step;
        }
    }

    totalNum(){

    }

}
module.exports = ShopProduct;
