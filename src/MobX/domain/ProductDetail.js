/**
 * Created by LDQ on 2017/7/31.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ProductDetail {
    @observable _info = {
        detailImages:[],
        showProduct:{},
        salesPromotionModel:{},
        count:1
    };
    @computed get info(){
        return this._info;
    }

    @observable isShowSpec = false;
    constructor(login) {
        this.login = login;

        //  todo 从shop点进去和从浏览器地址两种可能 暂时写一种
        let self = this;
        this.productInfo = function(postInfo){
            return _h.ajax.resource('/merchant/client/product/:action')
                .save({action:"detail"},postInfo)
        }.before(function(postInfo){
            postInfo.accessInfo = self.login.postDataAccessInfo.accessInfo;
            postInfo.user_id = self.login.postDataAccessInfo.user_id;
        });
    }
    @action getInfo(product){
        let postData = {
            distributeProductId:product.distributeProductId,
            purchaseProductType:product.purchaseProductType,
            selfProductId:product.selfProductId,
        };

        this.productInfo(postData).then((data)=>{
            Object.assign(this._info,data)
        });
    }
    resetSpec(prop){
        Object.assign(this._info,prop);
    }

    @action closeSpecOperator(){
        this.isShowSpec = false;
    }
    @action showSpecOperator(){
        this.isShowSpec = true;
        //  设置属性
        this.resetSpec({count:1});
    }
    @action increaseProductCount(step = 1){
        this._info.count += step;
    }
    @action reduceProductCount(step = 1){
        this._info.count -= step;
    }

}
module.exports = ProductDetail;