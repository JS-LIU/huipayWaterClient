/**
 * Created by LDQ on 2017/7/13.
 */
import {observable, computed,action} from "mobx";
import $ from 'jquery';

class ShopDetail{
    constructor(login,shopId){
        this.login = login;
        this.shopId = shopId;
    }

    @computed get info(){
        let self = this;
        let shopInfo = {};
        $.get('/merchant/client/shop/detail',{id:self.shopId},function(shopDetail){
            console.log(shopDetail);
            shopInfo = shopDetail;
        });
        return shopInfo;
    }
}
module.exports = ShopDetail;