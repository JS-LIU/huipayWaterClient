import {observable, computed,action,autorun} from "mobx";

class ShopProduct {
    constructor(product) {
        this._info = product;
    }
    @observable _info = {};
    @computed get info(){
        return this._info;
    }


    @action add(step = 1, max = this._info.storeNum) {
        if ( this.info.count < max) {
            this.info.count += step;
        }

    }
    @action reduce(step = 1, min = 0) {
        if (this.info.count > min) {
            this.info.count -= step;
        }
    }

    totalNum(){

    }

}
module.exports = ShopProduct;
