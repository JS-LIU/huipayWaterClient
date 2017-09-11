/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";
class Product{
    constructor(productType,productImageUrl,itemModel){
        this.imageUrl = productImageUrl;
        this.type = productType;
        this.name = itemModel.name;
        this.productItemId = itemModel.productItemId;
        this.originalPrice = itemModel.originalPrice;
        this.currentPrice = itemModel.currentPrice;
        this.saleMount = itemModel.saleMount;
        this._selectCount = itemModel.selectCount;
    }
    @observable _selectCount;
    @computed get selectCount(){
        return this._selectCount;
    }

    @action increase(){
        this._selectCount++;
    }
    @action reduce(){
        this._selectCount--;
    }
}
module.exports = Product;