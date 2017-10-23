/**
 * Created by LDQ on 2017/9/6
 */

import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';

class ShopInfo{
    constructor(login,position,shopInfo){
        this.login = login;
        this.shopInfo = shopInfo;
        this.shopHeadInfo = function(postInfo){
            return _h.ajax.resource('/shopinfo')
                .save({},postInfo)
        }.before((postInfo)=>{
            postInfo.accessInfo = this.login.postDataAccessInfo.accessInfo;
        });
        this.position = position;
    }

    @observable _homePageAddress = this.position.homePageAddress;
    @observable _info = {};
    @computed get info(){
        let info = this.shopInfo;
        let postData = Object.assign(info,{
            cityName: this._homePageAddress.city,
            latitude: this._homePageAddress.latitude,
            longtitude: this._homePageAddress.longitude,
        });
        this.shopHeadInfo(postData).then((info)=>{
            if(this._info.distance !== info.distance){
                this._info = info;
            }

        });
        return this._info
    }
}
module.exports = ShopInfo;