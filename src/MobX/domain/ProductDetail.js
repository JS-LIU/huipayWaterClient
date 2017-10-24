/**
 * Created by LDQ on 2017/7/31.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductDetail {
    constructor(login,shopInfo){
        this.login = login;
        this.shopId = shopInfo.shopId;

        this.getProductDetail = function (postInfo) {
            return _h.ajax.resource('/shop/shoppingcart/:action')
                .save({action: "increase"}, postInfo)
        }.before(function (postInfo) {
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
        });
    }
    @action getDetail(id){
        this.getProductDetail({
            productItemId:id,
            shopId:this.shopId
        }).then((data)=>{
            this._detail = data;
        });

    }
    @observable _detail = {};
    @computed get detail(){
        return this._detail;
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