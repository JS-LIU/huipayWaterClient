/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";

class WaterTicket{
    constructor(productName,productType,productImageUrl,itemModel){
        this.name = productName;
        this.imageUrl = productImageUrl;
        this.type = productType;
        this._productItemModels = itemModel;
    }
    @observable _productItemModels = [];
    @computed get productItemModels(){
        return this._productItemModels;
    }

    @computed get selectCount(){
        let count = 0;
        for(let i = 0;i < this.productItemModels.length;i++){
            count += this.productItemModels[i].selectCount;
        }
        return count;
    }
    @action showProductList(){
        this._show = true;
    }
    @action closeProductList(){
        this._show = false;
    }
    @observable _show = false;
    @computed get show(){
        return this._show;
    }
}
module.exports = WaterTicket;
