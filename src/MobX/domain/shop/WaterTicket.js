/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";

class WaterTicket{
    constructor(productName,productType,productImageUrl,itemModel){
        // this.productItemId = productItemId;
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
    @computed get totalPrice(){
        let price = 0;
        for(let i = 0;i < this.productItemModels.length;i++){
            price += (this.productItemModels[i].selectCount * this.productItemModels[i].currentPrice);
        }
        return price;
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
    @action unSelectedAll(){
        for(let i = 0;i < this._productItemModels.length;i++){
            this._productItemModels[i]._selected = false;
        }
    }
    findSelectedProductItem(){
        let selectedProductItem = function(productItem){
            return productItem.selected === true;
        };
        return this.productItemModels.find(selectedProductItem);
    }

}
module.exports = WaterTicket;
