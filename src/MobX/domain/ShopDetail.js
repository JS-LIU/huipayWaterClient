/**
 * Created by LDQ on 2017/7/13.
 */
import {observable, computed,action,autorun} from "mobx";
import _h from '../../Util/HB';


class ShopDetail{
    constructor(login){
        this.login = login;
        //  todo 获取shopId
        this.shopId = 1;
        let self = this;
        autorun(()=>{
            let url = '/merchant/client/shop/detail/' + self.shopId;
            _h.ajax.resource(url).query({}).then((data)=>{
                self.info = data;
            });
        })
    }

    @observable info = {};

}
module.exports = ShopDetail;