/**
 * Created by LDQ on 2017/7/31.
 */
import {observable, computed,action,autorun} from "mobx";
import WaterTicket from '../domain/shop/WaterTicket';
import _h from '../../Util/HB';
class ProductDetail {
    constructor(login,shoppingList,shopInfo,){
        this.login = login;
        this.shoppingList = shoppingList;
        this.shopId = shopInfo.shopId;


        this.setProductImages = function(imgList){
            let list = [];
            for(let i = 0;i < imgList.length;i++){
                list.push({
                    img:imgList[i]
                })
            }
            return list;
        };
        let self = this;
        this.getProductDetail = function (postInfo) {
            return _h.ajax.resource('/shop/:action')
                .save({action: "productItem"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @action getDetail(){

        this.getProductDetail({
            productItemId:this.productId,
            shopId:this.shopId
        }).then((data)=>{
            this._commonModels = data.commonModels;
            this._info = data.productModel;
        });

    }
    @observable _commonModels = [];
    @computed get commonModels(){
        return this._commonModels;
    }
    @observable _info = {
        productItemModels:[{}]
    };
    @computed get info(){
        return this._info;
    }

    @computed get waterTicket(){
        let list = [];
        for(let i = 0;i < this._info.productItemModels.length;i++){
            let productId = this._info.productItemModels[i].productItemId;
            function findProduct(item){
                if(item.productItemId === productId){
                    return item;
                }
            }
            let product = this.shoppingList.noRepeatProductList.find(findProduct);
            list.push(product);
        }

        return new WaterTicket(this._info.name,this._info.type,this._info.imageUrl,list);
    }
    @computed get product(){
        let self = this;
        function findProduct(item){
            if(item.productItemId === self.productId){
                return item;
            }
        }
        return this.shoppingList.noRepeatProductList.find(findProduct)||{productImages:[""]}
    }
    @computed get productImages(){
        let list = [];
        for(let i = 0 ;i < this.product.productImages.length;i++){
            list.push({
                img:this.product.productImages[i]
            })
        }
        return list;
    }



    @action setProductId(id){
        this._productId = id;
    }
    @observable _productId;
    @computed get productId(){
        return this._productId;
    }

}
module.exports = ProductDetail;