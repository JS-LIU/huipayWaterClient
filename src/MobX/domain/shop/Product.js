/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";
class Product{
    constructor(productName,productType,productImageUrl,itemModel){
        this.imageUrl = productImageUrl;
        this.productName = productName;
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
    @observable _selected = false;
    @action selectedItem(){
        this._selected = true;
    }
    @computed get selected(){
        return this._selected;
    }
}
module.exports = Product;