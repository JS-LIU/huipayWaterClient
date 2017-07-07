/**
 * Created by LDQ on 2017/7/6.
 */

import {observable, computed,action} from "mobx";
import _h from '../../Util/HB';

class AddressList{

    @observable list;

    constructor(login){
        let self = this;
        self.login = login;
        self.addressList = function(postInfo){
            return _h.ajax.resource('/location/client/deliveryAddress/:action')
                .save({action:"getAddressList"},postInfo)
        }.before(function(postInfo,accessInfo){
            postInfo.accessInfo = accessInfo
        });
    }

    @action getAddressList(pageNo,size = 5,sortProperties=[],direction = "DESC"){
        let self = this;
        let postInfo = {
            pageInfo:{
                direction:direction,
                pageNo:pageNo,
                size:size,
                sortProperties:[]
            },
            userId:self.login.userId
        };
        this.addressList(postInfo).then((list)=>{
            console.log(list);
            this.list = list;
        })
    }
}
module.exports = AddressList;