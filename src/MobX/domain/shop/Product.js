/**
 * Created by LDQ on 2017/9/11
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../../Util/HB';
class Product{
    constructor(shopId,productName,productType,productImageUrl,itemModel,login){
        this.imageUrl = productImageUrl;
        this.productName = productName;
        this.type = productType;
        this.name = itemModel.name;
        this.productItemId = itemModel.productItemId;
        this.originalPrice = itemModel.originalPrice;
        this.currentPrice = itemModel.currentPrice;
        this.saleMount = itemModel.saleMount;
        this._selectCount = itemModel.selectCount;
        this.login = login;
        this.shopId = shopId;

        let self = this;

        let ajax = _h.ajax.resource('/shop/shoppingcart/:action');
        this.increaseProduct = function (postInfo) {
            return ajax.save({action: "increase"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
        this.decreaseProduct = function (postInfo) {
            return ajax.save({action: "decrease"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @observable _selectCount;
    @computed get selectCount(){
        return this._selectCount;
    }
    @action increase(){
        this._selectCount++;
        let postData ={
            shopId:this.shopId,
            productItemId:this.productItemId,
            productType:this.type
        };
        this.increaseProduct(postData).then(()=>{

        }).catch(()=>{
            alert('呀，网络不好')
        })

    }
    @action reduce(){
        let postData ={
            shopId:this.shopId,
            productItemId:this.productItemId,
            productType:this.type
        };
        this.decreaseProduct(postData).then(()=>{

        }).catch(()=>{
            alert('呀，网络不好')
        });
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