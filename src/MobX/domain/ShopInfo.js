/**
 * Created by LDQ on 2017/9/6
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ShopInfo{
    constructor(login){
        this.login = login;
        this.shopInfo = function(postInfo){
            return _h.ajax.resource('/shopinfo')
                .save({},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = this.login.postDataAccessInfo.accessInfo;
        });
    }
    @action getShopInfo(shopId){
        this.shopInfo({
            shopId:shopId
        }).then((info)=>{
            this._info = info;
        })
    }
    @observable _info = {};
    @computed get info(){
        return this._info;
    }
}
module.exports = ShopInfo;