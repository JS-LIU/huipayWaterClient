/**
 * Created by LDQ on 2017/7/31.
 */
import {observable, computed,action,autorun} from "mobx";
import WaterTicket from '../domain/shop/WaterTicket';
import _h from '../../Util/HB';

import star from '../../images/star-5@2x.png';
import star_half from '../../images/star-6@2x.png';
import star_empty from '../../images/star-7@2x.png';

class ProductDetail {
    constructor(login,shoppingList,shopInfo,productItemId){
        this.login = login;
        this.shoppingList = shoppingList;
        this.shopId = shopInfo.shopId;
        this._productId = productItemId;

        this.setStarList = function(score){
            let list = [];
            let starNum = parseInt(score / 2 );
            let starEmptyNum = parseInt(parseInt(10 - score) / 2);
            for(let i = 0;i < starNum;i++){
                list.push(star);
            }
            if(score % 2){
                list.push(star_half);
            }
            for(let i = 0;i < starEmptyNum;i++){
                list.push(star_empty);
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
            for(let i = 0;i < data.commonModels.length;i++){
                data.commonModels[i].starList = this.setStarList(data.commonModels[i].score);
            }
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