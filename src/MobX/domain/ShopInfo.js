/**
 * Created by LDQ on 2017/9/6
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ShopInfo{
    constructor(login,position,shopId){
        this.login = login;
        this._shopId = shopId;
        this.shopHeadInfo = function(postInfo){
            return _h.ajax.resource('/shopinfo')
                .save({},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = this.login.postDataAccessInfo.accessInfo;
        });
        this._addressInfo = position.homePageAddress;

    }

    @observable _shopId;
    @computed get shopId(){
        return this._shopId;
    }
    @action setShopId(shopId){
        this._shopId = shopId;
    }


    @observable _addressInfo = {};
    @observable _info = {};
    @computed get info(){
        let postData = {
            shopId:this.shopId,
            cityName: this._addressInfo.city,
            latitude: this._addressInfo.latitude,
            longtitude: this._addressInfo.longitude,
        };
        this.shopHeadInfo(postData).then((info)=>{
            if(this._info.distance !== info.distance){
                this._info = info;
            }

        });
        return this._info
    }
}
module.exports = ShopInfo;